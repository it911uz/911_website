import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const createTag = async ({ body, token }: Params) => {
    return await http.post<ActionResponse<unknown>>("tags/", {
        token,
        json: body
    })
};

interface Params {
    body: {
        name: string;
        hex: string;
    };
    token?: string;
}