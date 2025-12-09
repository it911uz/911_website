import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const updateTarget = async ({ token, body, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`targets/${id}`, {
        token,
        json: body
    });
};

interface Params {
    token?: string;
    body: {
        name: string;
        is_active: boolean
    };
    id: string;
}