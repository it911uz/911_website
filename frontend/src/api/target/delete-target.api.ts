import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const deleteTarget = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`target/${id}`, {
        token,
    })
}

interface Params {
    id: string;
    token?: string
}