import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const editTaskPosition = async ({ token, body }: Params) => {
    return await http.post<ActionResponse<unknown>>("tasks/move", {
        token,
        json: body
    });
};

export type Params = {
    token?: string;
    body: {
        task_id: number;
        status_id: number;
    };
};