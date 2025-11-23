import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteCompanyComment = async ({ id, token, companyId }: Params) => {
    return http.delete<ActionResponse<unknown>>(`companies/${companyId}/comments/${id}`, {
        token,
    })
}

interface Params {
    id: number
    token?: string
    companyId: number
}