import { http } from "@/lib/https.util"
import type { JWTType } from "@/types/jwt.type"
import type { ActionResponse } from "@/types/share.type"

export const refreshToken = async ({ token, refresh_token }: Params) => {
    return await http.post<ActionResponse<JWTType>>("auth/refresh/", {
        json: {
            refresh_token
        },
        token,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

interface Params {
    token: string
    refresh_token: string
}