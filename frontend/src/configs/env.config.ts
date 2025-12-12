export const Env = {
    PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
    AUTH_SECRET: process.env.AUTH_SECRET!,
    NODE_ENV: process.env.NODE_ENV || "production",
} as const;
