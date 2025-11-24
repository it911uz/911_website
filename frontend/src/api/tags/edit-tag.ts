import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const editTag = async ({ body, token, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`tags/${id}`, {
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
    id: number;
}