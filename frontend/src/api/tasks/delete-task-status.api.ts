import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteTaskStatus = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`task-statuses/${id}`, {
        token,
    })
}

interface Params {
    id: number
    token?: string
}