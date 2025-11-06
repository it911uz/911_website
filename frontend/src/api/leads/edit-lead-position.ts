import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const editLeadPosition = async ({ body, token }: Params) => {
    return await http.post<ActionResponse<unknown>>("leads/move", {
        token,
        json: body
    })
}

interface Params {
    body: {
        lead_id: number;
        status_id: number;
    },
    token?: string
}