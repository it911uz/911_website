import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const createRole = async ({ token, body }: Params) => {
    return await http.post<ActionResponse<unknown>>(`roles/`, {
        token,
        json: body
    });
};

interface Params {
    token?: string;
    body: {
        name: string;
    }
}