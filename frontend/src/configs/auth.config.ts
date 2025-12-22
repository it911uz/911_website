import { CredentialsSignin, type NextAuthConfig, type User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { CredentialsConfig } from "next-auth/providers/credentials";
import { safeParse } from "zod";

import { refreshToken } from "@/api/auth/refresh-token.api";
import { login } from "@/api/auth/login.api";
import { getMe } from "@/api/auth/get-me.api";
import { Env } from "@/configs/env.config";
import { loginSchema } from "@/schemas/login.schema";
import { Routers } from "./router.config";

export const SESSION_TOKEN_NAME = "authjs.session-token";
export const SESSION_TOKEN_EXPIRATION = 110 * 60 * 1000;

class InvalidLoginError extends CredentialsSignin {
    constructor(message: string, cause?: unknown) {
        super(message, { cause });
        this.code = message;
    }
    override code = "InvalidCredentials";
}

export const refreshAccessToken = async (jwt: JWT): Promise<JWT> => {
    const response = await refreshToken({
        refresh_token: jwt.refreshToken,
    });

    if (!response?.data?.access_token) {
        return { ...jwt, error: "RefreshTokenError" };
    }

    const me = await getMe(response.data.access_token);

    if (!me?.data?.id) {
        return { ...jwt, error: "RefreshTokenError" };
    }

    return {
        ...jwt,
        id: me.data.id,
        userId: me.data.id,
        userEmail: me.data.email,
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: Date.now() + SESSION_TOKEN_EXPIRATION,
        name: me.data.full_name,
        email: me.data.email,
        is_superuser: me.data.is_superuser,
        role: me.data.role,
    };
};

export const AuthConfig: NextAuthConfig = {
    trustHost: true,
    secret: Env.AUTH_SECRET,
    debug: Env.NODE_ENV === "development",
    providers: [],
    basePath: "/api/auth",
    pages: {
        signIn: Routers.auth.signIn,
        newUser: Routers.auth.signUp,
    },
    callbacks: {
        jwt: async ({ token, user, account }) => {
            if (account?.provider === "credentials" && user) {
                return {
                    ...token,
                    userId: user.userId,
                    userEmail: user.userEmail,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    expiresAt: user.expiresAt,
                    is_superuser: user.is_superuser,
                    role: user.role,
                };
            }

            if (Date.now() < token.expiresAt) {
                return token;
            }

            const newToken = await refreshAccessToken(token);

            if (newToken.error === "RefreshTokenError") {
                return null;
            }

            return newToken;
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                userId: token.userId,
                userEmail: token.userEmail,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                expiresAt: token.expiresAt,
                is_superuser: token.is_superuser,
                role: token.role,
            },
        }),
        authorized: ({ auth }) => Boolean(auth),
    },
    useSecureCookies: process.env.NODE_ENV === "production",
    cookies: {
        sessionToken: {
            name: SESSION_TOKEN_NAME,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
};

export const CredentialsProviderConfig: CredentialsConfig = {
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
        try {
            const parsed = safeParse(loginSchema, credentials);

            if (!parsed.success) {
                console.error('Validation error:', parsed.error);
                throw new InvalidLoginError("Неверные учетные данные", parsed.error);
            }

            const formData = new FormData();
            formData.append("username", parsed.data.username);
            formData.append("password", parsed.data.password);

            const response = await login({ body: formData });

            if (!response.ok) {
                console.error('Login API error:', response);
                throw new InvalidLoginError(
                    "Такой комбинации username и пароля не существует",
                    response,
                );
            }

            const me = await getMe(response.data.access_token);

            const user: User = {
                id: String(me.data.id),
                userId: me.data.id,
                userEmail: me.data.email,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
                expiresAt: Date.now() + SESSION_TOKEN_EXPIRATION,
                name: me.data.full_name,
                email: me.data.email,
                is_superuser: me.data.is_superuser,
                role: me.data.role,
            };

            return user;
        } catch (error) {
            console.error('Authorization error:', error);
            throw error;
        }
    },
};
