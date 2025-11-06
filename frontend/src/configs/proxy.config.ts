import "server-only";

import { type NextRequest, NextResponse } from "next/server";
import { decode, encode, getToken, type JWT } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { refreshToken } from "@/api/auth/refresh-token.api";
import { SESSION_TOKEN_EXPIRATION, SESSION_TOKEN_NAME } from "./auth.config";
import { Env } from "./env.config";
import { defaultLocale, locales } from "./i18n.config";
import { Routers } from "./router.config";
import { getMe } from "@/api/auth/get-me.api";

export const intlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix: {
		mode: "as-needed",
	},
	localeDetection: false,
});

const protectedPages = ["/admin"];

export function removeLocaleFromPath(pathname: string) {
	const localePattern = `^/(${locales.join("|")})(/|$)`;
	return pathname.replace(new RegExp(localePattern, "i"), "/");
}

export function isProtectedRoute(path: string): boolean {
	return protectedPages.some((page) => path.startsWith(page));
}

function shouldRefreshToken(jwt: JWT | null): boolean {
	console.log("Date.now()", Date.now());
	console.log("jwt.expiresAt", jwt?.expiresAt);

	return jwt ? Date.now() >= jwt.expiresAt : false;
}

async function mySignOut(request: NextRequest) {
	const res = NextResponse.redirect(new URL(Routers.auth.signIn, request.nextUrl));
	res.cookies.delete({
		name: SESSION_TOKEN_NAME,
		path: "/",
		secure: true,
		httpOnly: true,
		// domain: request.nextUrl.hostname,
	});
	return res;
}

async function refreshAccessToken(jwt: JWT): Promise<JWT> {
	const response = await refreshToken(jwt.refreshToken);

	if (!response.data.access_token) {
		console.error("Path: Middleware. API: refreshToken", response.error);
		return { ...jwt, error: "RefreshTokenError" };
	}

	const me = await getMe(response.data.access_token);

	if (!me.data.id) {
		console.error("Path: Middleware. API: getMe", me.error);
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
	};
}

// Update session cookie with new session token
async function refreshSessionCookie(jwt: JWT, request: NextRequest) {
	const newJWT = await refreshAccessToken(jwt);
	console.log("newJWT.error", newJWT.error);
	console.log(
		'newJWT.error === "RefreshTokenError"',
		newJWT.error === "RefreshTokenError",
	);

	if (newJWT.error === "RefreshTokenError") {
		return mySignOut(request);
	}
	// Encode new session token
	const encodedSession = await encode({
		token: newJWT,
		secret: Env.AUTH_SECRET,
		salt: SESSION_TOKEN_NAME,
	});

	const res = intlMiddleware(request);

	res.cookies.set({
		name: SESSION_TOKEN_NAME,
		value: encodedSession,
		// domain: request.nextUrl.hostname,
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax",
	});

	return res;
}

export const proxyMiddleware = async (
	request: NextRequest,
): Promise<NextResponse<unknown>> => {
	const pathname = request.nextUrl.pathname;
	const pathWithoutLocale = removeLocaleFromPath(pathname);
	const isPrivateRoute = isProtectedRoute(pathWithoutLocale);

	const jwt = await getToken({
		req: request,
		cookieName: SESSION_TOKEN_NAME,
		secret: Env.AUTH_SECRET,
		decode,
		salt: SESSION_TOKEN_NAME,
	});

	// Handle public pages
	if (isPrivateRoute) {
		// Require valid session for private routes
		if (!jwt) {
			return NextResponse.redirect(new URL(Routers.auth.signIn, request.nextUrl));
		}

		if (jwt.error === "RefreshTokenError") {
			return mySignOut(request);
		}

		console.log("shouldRefreshToken(jwt)", shouldRefreshToken(jwt));

		if (shouldRefreshToken(jwt)) {
			return refreshSessionCookie(jwt, request);
		}
		return intlMiddleware(request);
	}

	// Public routes: never refresh in middleware
	return intlMiddleware(request);
};
