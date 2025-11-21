import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteLead = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`leads/${id}`, {
        token,
    })
}

interface Params {
    id: number
    token?: string
}