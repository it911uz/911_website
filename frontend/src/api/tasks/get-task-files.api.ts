import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";
import type { TaskFile } from "@/types/tasks.type";

export const getTaskFiles = async ({ taskId, token }: Params) => {
    return await http.get<ActionResponse<TaskFile[]>>(`tasks/${taskId}/files/`, {
        token,
    });
}

interface Params {
    token?: string
    taskId: number
}