import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const editTask = async ({ body, token, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`tasks/${id}`, {
        token,
        json: body
    });
};

interface Params {
    token?: string;
    body: {
        name: string;
        description: string;
        deadline: string;
        status_id: number;
        tag_ids: number[];
        user_ids: number[];
    };
    id: number;
}