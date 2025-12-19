import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { decode, encode, getToken, type JWT } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";

import { refreshToken } from "@/api/auth/refresh-token.api";
import { getMe } from "@/api/auth/get-me.api";
import { SESSION_TOKEN_EXPIRATION, SESSION_TOKEN_NAME } from "@/configs/auth.config";
import { Env } from "@/configs/env.config";
import { defaultLocale, locales } from "@/configs/i18n.config";
import { Routers } from "@/configs/router.config";

export const intlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix: { mode: "as-needed" },
	localeDetection: false,
});

const protectedPages = ["/admin"];

export const removeLocaleFromPath = (pathname: string) =>
	pathname.replace(new RegExp(`^/(${locales.join("|")})(/|$)`, "i"), "/");

export const isProtectedRoute = (path: string) =>
	protectedPages.some((page) => path.startsWith(page));

export const shouldRefreshToken = (jwt: JWT | null) => {
	if (!jwt?.expiresAt) return false;
	return jwt.expiresAt - Date.now() <= 5 * 60 * 1000;
};

export const mySignOut = async (request: NextRequest) => {
	const res = NextResponse.redirect(new URL(Routers.auth.signIn, request.nextUrl));
	res.cookies.delete({
		name: SESSION_TOKEN_NAME,
		path: "/",
	});
	return res;
};

export const refreshAccessToken = async (jwt: JWT): Promise<JWT> => {
	const response = await refreshToken({
		refresh_token: jwt.refreshToken,
		token: jwt.accessToken,
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
	};
};

export const refreshSessionCookie = async (jwt: JWT, request: NextRequest) => {
	const newJWT = await refreshAccessToken(jwt);

	if (newJWT.error === "RefreshTokenError") {
		return mySignOut(request);
	}

	const encoded = await encode({
		token: newJWT,
		secret: Env.AUTH_SECRET,
		salt: SESSION_TOKEN_NAME,
	});

	const res = intlMiddleware(request);

	res.cookies.set({
		name: SESSION_TOKEN_NAME,
		value: encoded,
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax",
	});

	return res;
};

export const proxyMiddleware = async (request: NextRequest) => {
	const pathname = request.nextUrl.pathname;
	const path = removeLocaleFromPath(pathname);
	const isPrivate = isProtectedRoute(path);

	const jwt = await getToken({
		req: request,
		cookieName: SESSION_TOKEN_NAME,
		secret: Env.AUTH_SECRET,
		decode,
		salt: SESSION_TOKEN_NAME,
	});

	if (isPrivate) {
		if (!jwt) {
			return NextResponse.redirect(new URL(Routers.auth.signIn, request.nextUrl));
		}

		if (jwt.error === "RefreshTokenError") {
			return mySignOut(request);
		}

		if (shouldRefreshToken(jwt)) {
			return refreshSessionCookie(jwt, request);
		}
		return intlMiddleware(request);
	}

	return intlMiddleware(request);
};
