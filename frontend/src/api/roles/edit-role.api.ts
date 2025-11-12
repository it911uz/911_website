import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const editRole = async ({ token, body, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`roles/${id}`, {
        token,
        json: body
    });
};

interface Params {
    token?: string;
    body: {
        name: string;
    },
    id: number
}