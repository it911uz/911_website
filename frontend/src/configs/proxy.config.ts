import "server-only";

import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./i18n.config";
import { NextResponse, type NextRequest } from "next/server";
import { Routers } from "./router.config";
import { SESSION_TOKEN_EXPIRATION, SESSION_TOKEN_NAME } from "./auth.config";
import type { JWTType } from "@/types/jwt.type";
import { refreshToken } from "@/api/auth/refresh-token.api";
import { getMe } from "@/api/auth/get-me.api";
import { decryptMessage, encryptMessage } from "@/lib/crypto.util";

const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: { mode: "as-needed" },
    localeDetection: false,
});

const protectedPages = ["/admin"];

const removeLocaleFromPath = (pathname: string): string => {
    const localePattern = `^/(${locales.join("|")})(/|$)`;
    return pathname.replace(new RegExp(localePattern, "i"), "/");
};

const isProtectedRoute = (path: string): boolean => {
    return protectedPages.some((protectedPage) => path.startsWith(protectedPage));
};

const mySignOut = async (request: NextRequest) => {
    const response = NextResponse.redirect(new URL(Routers.auth.signIn, request.url));
    response.cookies.delete(SESSION_TOKEN_NAME);
    return response;
};

const refreshAccessToken = async (jwt: JWTType): Promise<JWTType> => {
    const response = await refreshToken(jwt.refresh_token);

    if (!response.data.access_token) {
        console.error("Path: Middleware. API: refreshToken", response.error);
        return jwt;
    }

    const me = await getMe(response.data.access_token);

    if (!me.data) {
        console.error("Path: Middleware. API: getMe", me.error);
        return jwt;
    }

    return {
        ...jwt,
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        user: me.data,
        expiresAt: SESSION_TOKEN_EXPIRATION
    };
};

const refreshSessionCookie = async (jwt: JWTType, request: NextRequest) => {
    const newJWT = await refreshAccessToken(jwt);

    if (!newJWT.access_token) {
        return mySignOut(request);
    }

    const encodeSession = await encryptMessage(newJWT);
    const response = handleI18nRouting(request);

    response.cookies.set(SESSION_TOKEN_NAME, encodeSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return response;
};

const shouldRefreshToken = (jwt: JWTType | null): boolean => {
    return jwt ? Date.now() >= jwt.expiresAt : false;
};

export const proxyMiddleware = async (request: NextRequest): Promise<NextResponse> => {
    const pathname = request.nextUrl.pathname;
    const pathWithoutLocale = removeLocaleFromPath(pathname);

    // не проверяем логин
    if (pathWithoutLocale === Routers.auth.signIn) {
        return handleI18nRouting(request);
    }

    const isPrivateRoute = isProtectedRoute(pathWithoutLocale);
    const sessionToken = request.cookies.get(SESSION_TOKEN_NAME)?.value;

    if (!sessionToken && isPrivateRoute) {
        return mySignOut(request);
    }

    let jwt: JWTType | null = null;

    if (sessionToken) {
        jwt = await decryptMessage<JWTType>(sessionToken) as JWTType;
    }

    if (isPrivateRoute) {
        if (!jwt) {
            return mySignOut(request);
        }

        if (shouldRefreshToken(jwt)) {
            return refreshSessionCookie(jwt, request);
        }
    }

    return handleI18nRouting(request);
};
