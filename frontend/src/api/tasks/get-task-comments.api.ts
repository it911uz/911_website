import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";
import type { TaskComment } from "@/types/tasks.type";

export const getTaskComments = async ({ token, id }: Params) => {
    return await http.get<ActionResponse<TaskComment[]>>(`tasks/${id}/comments/`, {
        token,
    });
};

interface Params {
    token?: string;
    id: number;
}