import type { User } from "./user.type";

export interface JWTType {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: User;
    expiresAt: number
}