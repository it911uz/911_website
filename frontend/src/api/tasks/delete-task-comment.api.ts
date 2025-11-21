import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const deleteTaskComment = async ({ token , taskId, commentId}: Params) => {
    return http.delete<ActionResponse<unknown>>(`tasks/${taskId}/comments/${commentId}`, {
        token,
    })
}

interface Params {
    token?: string;
    taskId: number;
    commentId: number;
}