import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const deleteRole = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`roles/${id}`, {
        token,
    })
}

interface Params {
    id: number;
    token?: string
}