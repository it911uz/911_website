export const Env = {
    PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://fastapi-app:8000",
    AUTH_SECRET: "VTozt8gWQtYlr6KFUUkYNbLREB3DDFBcihNgqbJPPFs=",
    NODE_ENV: process.env.NODE_ENV || "development"
} as const;