import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteCompany = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`companies/${id}`, {
        token,
    })
}

interface Params {
    id: number
    token?: string
}