import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const deleteTag = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`tags/${id}`, {
        token,
    })
}

interface Params {
    id: number;
    token?: string;
}