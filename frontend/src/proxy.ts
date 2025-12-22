import type { NextRequest } from "next/server";
import { proxyMiddleware } from "./configs/proxy.config";

export const proxy = async (request: NextRequest) => {
	return proxyMiddleware(request);
};

export const config = {
	matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
