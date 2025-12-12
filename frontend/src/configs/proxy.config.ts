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
	localePrefix: { mode: "as-needed" },
	localeDetection: false,
});

const protectedPages = [Routers.admin.home];

// -------------------------------------
// Утилиты для маршрутов
// -------------------------------------

export const removeLocaleFromPath = (pathname: string) => {
	const regex = new RegExp(`^/(${locales.join("|")})(/|$)`, "i");
	return pathname.replace(regex, "/");
};

export const isProtectedRoute = (path: string): boolean =>
	protectedPages.some((page) => path.startsWith(page));

// Проверяем, нужно ли обновлять токен
export const shouldRefreshToken = (token: JWT | null): boolean => {
	if (!token || typeof token.expiresAt !== "number") return false;

	const buffer = 15 * 60 * 1000; // Обновлять за 15 минут до истечения
	return Date.now() >= token.expiresAt - buffer;
};

// -------------------------------------
// Хелперы редиректов
// -------------------------------------

// Выход пользователя + очистка cookie
export const mySignOut = (request: NextRequest) => {
	const res = NextResponse.redirect(
		new URL(Routers.auth.signIn, request.nextUrl),
	);
	res.cookies.delete(SESSION_TOKEN_NAME);
	return res;
};

// Редирект на главную + очистка cookie
export const redirectHome = (request: NextRequest) => {
	const res = NextResponse.redirect(new URL(Routers.home, request.url));
	res.cookies.delete(SESSION_TOKEN_NAME);
	return res;
};

// -------------------------------------
// Логика обновления токена
// -------------------------------------

// Обновление access_token через refresh_token
export const refreshAccessToken = async (jwt: JWT): Promise<JWT> => {
	const res = await refreshToken(jwt.refreshToken);

	if (!res?.data?.access_token) {
		console.error("Path: Middleware. API: refreshToken", res.error);
		return { ...jwt, error: "RefreshTokenError" };
	}

	const me = await getMe(res.data.access_token);

	if (!me?.data?.id) {
		return { ...jwt, error: "RefreshTokenError" };
	}

	return {
		...jwt,
		id: me.data.id,
		userId: me.data.id,
		userEmail: me.data.email,
		accessToken: res.data.access_token,
		refreshToken: res.data.refresh_token,
		expiresAt: Date.now() + SESSION_TOKEN_EXPIRATION,
		name: me.data.full_name,
		email: me.data.email,
	};
};

// Перезапись session cookie новым токеном
export const refreshSessionCookie = async (jwt: JWT, request: NextRequest) => {
	const newJWT = await refreshAccessToken(jwt);

	// Не удалось обновить → разлогиниваем
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

// -------------------------------------
// Основной middleware
// -------------------------------------

export const proxyMiddleware = async (request: NextRequest) => {
	const pathname = request.nextUrl.pathname;
	const route = removeLocaleFromPath(pathname);
	const isPrivate = isProtectedRoute(route);

	const jwt = await getToken({
		req: request,
		cookieName: SESSION_TOKEN_NAME,
		secret: Env.AUTH_SECRET,
		decode,
		salt: SESSION_TOKEN_NAME,
	});

	// Защищённые маршруты
	if (isPrivate) {
		// Нет токена → разлогин
		if (!jwt) return mySignOut(request);

		// Ранее refresh уже упал
		if (jwt.error === "RefreshTokenError") return mySignOut(request);

		// Токен почти истёк → обновляем
		if (shouldRefreshToken(jwt)) {
			return await refreshSessionCookie(jwt, request);
		}

		// Доступ разрешён
		return intlMiddleware(request);
	}

	// Публичные маршруты
	return intlMiddleware(request);
};
