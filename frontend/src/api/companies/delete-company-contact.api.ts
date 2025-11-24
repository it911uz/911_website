import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteCompanyContact = async ({ id, token, companyId }: Params) => {
    return http.delete<ActionResponse<unknown>>(`companies/${companyId}/contacts/${id}`, {
        token,
    })
}

interface Params {
    id: number
    token?: string
    companyId: number
}