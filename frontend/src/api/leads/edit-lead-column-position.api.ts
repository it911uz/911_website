import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const editLeadColumnPosition = async ({ body, token }: Params) => {
    return await http.post<ActionResponse<unknown>>("lead-column-moves/", {
        token,
        json: body
    })
}

interface Params {
    body: {
        status_id: number
        new_position: number
    }
    token?: string
}