import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const editTaskStatusPosition = async ({ body, token }: Params) => {
    return await http.post<ActionResponse<unknown>>("task-statuses/move", {
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