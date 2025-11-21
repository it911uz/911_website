import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const createTaskComment = ({ body, token, taskId }: Params) => {
    return http.post<ActionResponse<unknown>>(`tasks/${taskId}/comments/`, {
        token,
        json: body
    })
}

interface Params {
    token?: string
    body: {
        comment: string
    }
    taskId: number
}