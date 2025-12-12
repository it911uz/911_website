import type { NextRequest, NextResponse } from "next/server";
import { proxyMiddleware } from "./configs/proxy.config";

export const proxy = async (
	request: NextRequest,
): Promise<NextResponse<unknown>> => {
	return proxyMiddleware(request);
};

export const config = {
	matcher: ["/((?!api|_next|_vercel|favicon.ico|manifest.webmanifest|.*\\..*).*)"],
};
