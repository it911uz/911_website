import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteService = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`services/${id}`, {
        token,
    })
}

interface Params {
    id: number
    token?: string
}