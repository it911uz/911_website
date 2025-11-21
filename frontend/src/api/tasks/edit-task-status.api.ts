import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type";

export const editTaskStatus = ({ body, token, id }: Params) => {
    return http.put<ActionResponse<unknown>>(`task-statuses/${id}`, {
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
    token?: string;
    id: number
}