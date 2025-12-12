export const Env = {
    PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.it911.uz",
    AUTH_SECRET: process.env.AUTH_SECRET || "VTozt8gWQtYlr6KFUUkYNbLREB3DDFBcihNgqbJPPFs=",
    NODE_ENV: process.env.NODE_ENV || "production",
} as const;