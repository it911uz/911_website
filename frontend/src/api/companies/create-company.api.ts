import { http } from "@/lib/https.util";
import type { ActionResponse, BaseApiParams } from "@/types/share.type";

export const createCompany = async ({ token, body }: Params) => {
    return await http.post<ActionResponse<unknown>>("companies/", {
        token,
        json: body
    });
};

interface Params extends BaseApiParams {
    token?: string
    body: {
        name: string;
        info: string;
        status: string;
        phone_number: string;
    }
}