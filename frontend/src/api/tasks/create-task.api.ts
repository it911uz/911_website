import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const createTask = async ({ body, token }: Params) => {
    return await http.post<ActionResponse<unknown>>("tasks/", {
        token,
        json: body
    })
}

interface Params {
    body: {
        name: string;
        description: string;
        deadline: string;
        status_id: number;
        tag_ids: number[];
        user_ids: number[];
    };
    token?: string
}