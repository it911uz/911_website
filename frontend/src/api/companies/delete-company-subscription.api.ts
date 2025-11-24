import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteCompanySubscription = async ({ id, token, companyId }: Params) => {
    return http.delete<ActionResponse<unknown>>(`companies/${companyId}/subscriptions/${id}`, {
        token,
    })
}

interface Params {
    id: number
    token?: string
    companyId: number
}