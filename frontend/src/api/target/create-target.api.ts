import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const createTarget = async ({ token, body }: Params) => {
    return await http.post<ActionResponse<unknown>>(`target/`, {
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