import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const editLeadStatus = async ({ body, id, token }: Params) => {
    return http.put<ActionResponse<unknown>>(`lead-statuses/${id}`, {
        json: body,
        token,
    })
}

interface Params {
    id: number;
    token?: string;
    body: {
        name: string;
        hex: string;
    }
}