import { http } from "@/lib/https.util";
import type { ActionResponse, } from "@/types/share.type";
import type { TaskStatus } from "@/types/tasks.type";

export const getTasksStatuses = async ({ token }: Params) => {

    return await http.get<ActionResponse<TaskStatus[]>>("task-statuses/", {
        token,
    });
};

interface Params {
    token?: string;
}