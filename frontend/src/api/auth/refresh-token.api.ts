import { http } from "@/lib/https.util"
import type { JWTType } from "@/types/jwt.type"
import type { ActionResponse } from "@/types/share.type"

export const refreshToken = async (refresh_token: string) => {
    return await http.post<ActionResponse<JWTType>>("auth/refresh/", {
        json: {
            refresh_token
        }
    })
}