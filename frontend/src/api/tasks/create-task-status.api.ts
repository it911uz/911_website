import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type";

export const createTaskStatus = ({ body, token }: Params) => {
    return http.post<ActionResponse<unknown>>("task-statuses/", {
        token,
        json: body
    });
}

interface Params {
    body: {
        name: string;
        hex: string;
        is_completed: boolean
    }
    token?: string
}