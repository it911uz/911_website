import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const createLeadComment = ({ body, token, leadId }: Params) => {
    return http.post<ActionResponse<unknown>>(`leads/${leadId}/comments/`, {
        token,
        json: body
    })
}

interface Params {
    leadId: number
    token?: string
    body: {
        comment: string
    }
}