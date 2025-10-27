import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./configs/i18n.config";

const handleI18nRouting = createMiddleware({
	locales,
	defaultLocale,
	localePrefix: { mode: "as-needed" },
	localeDetection: false,
});

export default function proxy(request: NextRequest) {
	return handleI18nRouting(request);
}

export const config = {
	matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
