import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteLeadFile = async ({ id, token, lead_id }: Params) => {
    return await http.delete<ActionResponse<unknown>>(`leads/${lead_id}/files/${id}`, {
        token,
    })
}

interface Params {
    id: string
    token?: string
    lead_id: number
}