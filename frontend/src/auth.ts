import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthConfig, CredentialsProviderConfig } from "./configs/auth.config";

export const config = {
	...AuthConfig,
	providers: [
		CredentialsProvider(CredentialsProviderConfig),
	],
};

export const { handlers, auth, signIn, signOut, unstable_update } =
	NextAuth(config);