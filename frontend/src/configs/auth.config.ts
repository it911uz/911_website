
import { CredentialsSignin, type NextAuthConfig, type User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { CredentialsConfig } from "next-auth/providers/credentials";
import { safeParse } from "zod";

import { refreshToken } from "@/api/auth/refresh-token.api";
import { Env } from "@/configs/env.config";
import { loginSchema } from "@/schemas/login.schema";
import { login } from "@/api/auth/login.api";
import { getMe } from "@/api/auth/get-me.api";

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
        isSuperuser: me.data.is_superuser,
        permissions: me.data.role.permissions.map((p) => p.codename),
    };
};

export const AuthConfig: NextAuthConfig = {
    trustHost: true,
    secret: Env.AUTH_SECRET,
    debug: Env.NODE_ENV === "development",
    providers: [],
    callbacks: {
        jwt: async ({ token, user, account }) => {
            if (account) {
                if (account?.provider === "credentials" && account && user) {
                    return {
                        ...token,
                        userId: user.userId,
                        userEmail: user.userEmail,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken,
                        expiresAt: user.expiresAt,
                        isSuperuser: user.isSuperuser, //
                        permissions: user.permissions, //
                    };
                }
            } else if (Date.now() < token.expiresAt) {
                console.log("Date.now()", Date.now());
                console.log("token.expiresAt", token.expiresAt);
                console.log("**** returning previous token ******");

                return token;
            } else {
                console.log("**** token expired ******");
                console.log("**** new token ******");
                const newToken = await refreshAccessToken(token);

                if (newToken.error === "RefreshTokenError") {
                    console.log("newToken has error, signing out");
                    return null;
                }
                console.log("newToken:", newToken);

                return newToken;
            }

            return null;
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                userId: token.userId,
                userEmail: token.userEmail,
                accessToken: token.accessToken,
                expiresAt: token.expiresAt,
                refreshToken: token.refreshToken,
                isSuperuser: token.isSuperuser ?? false,
                permissions: token.permissions ?? [],
            },
        }),
        authorized: ({ auth }) => !!auth,
    },
};

export const CredentialsProviderConfig: CredentialsConfig = {
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {
        username: {
            label: "Username",
            type: "username",
        },
        password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
        try {
            const parsed = safeParse(loginSchema, credentials);
            if (!parsed.success) {
                throw new CredentialsSignin("Неверные данные формы");
            }

            const formData = new FormData();

            if (parsed.success) {
                formData.append("username", parsed.data.username);
                formData.append("password", parsed.data.password);
            }

            if (!parsed.success) {
                console.error(
                    "PATH: auth CredentialsProvider. Invalid credentials in CredentialsProvider",
                    parsed,
                );
                throw new InvalidLoginError("Неверные учетные данные", {
                    cause: parsed,
                });
            }

            const response = await login({ body: formData });

            if (!response.ok) {
                console.error("PATH: auth CredentialsProvider. Invalid credentials", {
                    cause: response,
                });
                throw new CredentialsSignin(
                    response.error?.detail ?? "Неверный логин или пароль",
                );
            }

            const me = await getMe(response.data?.access_token as string);

            const user: User = {
                id: String(me.data.id),
                userId: me.data.id,
                userEmail: me.data.email,
                accessToken: response.data?.access_token as string,
                refreshToken: response.data?.refresh_token as string,
                expiresAt: Date.now() + SESSION_TOKEN_EXPIRATION,
                name: me.data.full_name,
                email: me.data.email,
                isSuperuser: me.data.is_superuser,
                permissions: me.data.role.permissions.map((p) => p.codename),
            };

            return user;
        } catch (error: unknown) {
            if (error instanceof CredentialsSignin) {
                throw error;
            };

            throw new InvalidLoginError(
                error instanceof Error ? error.message : "Ошибка авторизации",
                error,
            );
        }
    },
};
