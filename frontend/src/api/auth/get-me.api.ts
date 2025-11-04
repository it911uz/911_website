import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"
import type { User } from "@/types/user.type"

export const getMe = async (token: string) => {
    return await http.get<ActionResponse<User>>("auth/me/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
} 