import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const deleteUser = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`users/${id}`, {
        token,
    })
}

interface Params {
    id: number;
    token?: string
}