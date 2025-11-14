import { http } from "@/lib/https.util";
import type { ActionResponse, BaseApiParams } from "@/types/share.type";

export const updateCompany = async ({ token, body, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`companies/${id}`, {
        token,
        json: body
    });
};

interface Params extends BaseApiParams {
    token?: string;
    body: {
        name: string;
        info: string;
        status: string;
        phone_number: string;
    };
    id: number
}