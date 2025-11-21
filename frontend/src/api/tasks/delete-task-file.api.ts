import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const deleteTaskFile = async ({ id, token, taskId }: Params) => {
    return await http.delete<ActionResponse<unknown>>(`tasks/${taskId}/files/${id}`, {
        token,
    })
}

interface Params {
    id: string
    token?: string
    taskId: number
}