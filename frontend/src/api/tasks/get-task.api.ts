import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";
import type { Task } from "@/types/tasks.type";

export const getTask = async ({ token, id, }: Params) => {
  

    return await http.get<ActionResponse<Task>>(`tasks/${id}`, {
        token,
    });
};

interface Params {
    token?: string;
    id: number;
    
}