export const Env = {
    PUBLIC_API_URL: "http://fastapi-app:8000",
    AUTH_SECRET: process.env.AUTH_SECRET!,
    NODE_ENV: process.env.NODE_ENV || "production",
} as const;
