import type { locales } from "@/configs/i18n.config";
import type messages from "./../../messages/ru.json";
import type { DefaultSession } from "next-auth";
import type { Role } from "./user.type";

// next-auth
declare module "next-auth" {
	interface User {
		userId: number;
		userEmail: string;
		accessToken: string;
		refreshToken: string;
		expiresAt: number;
		is_superuser: boolean;
		role: Role;
	}

	interface Session {
		user: User & DefaultSession["user"];
		error?: "RefreshTokenError";
	}
}
declare module "next-auth/jwt" {
	interface JWT {
		userId: number;
		userEmail: string;
		accessToken: string;
		refreshToken: string;
		expiresAt: number;
		error?: "RefreshTokenError";
		is_superuser: boolean;
		role: Role;
	}
}

declare module "next-intl" {
	interface AppConfig {
		Locale: (typeof locales)[number];
		Messages: typeof messages;
	}
}
