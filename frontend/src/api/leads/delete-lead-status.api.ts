import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const deleteLeadStatus = async ({ id, token }: Params) => {
    return http.delete<ActionResponse<unknown>>(`lead-statuses/${id}`, {
        token,
    })
}

interface Params {
    id: number;
    token?: string
}