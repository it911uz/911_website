import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteTask = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`tasks/${id}`, {
        token,
    })
}

interface Params {
    id: number
    token?: string
}