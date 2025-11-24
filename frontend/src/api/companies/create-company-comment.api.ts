import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const createCompanyComment = async ({ body, token, companyId }: Params) => {
    return await http.post<ActionResponse<unknown>>(`companies/${companyId}/comments/`, {
        token,
        json: body
    });
};

interface Params {
    body: {
        comment: string;
    };
    token?: string;
    companyId: number;
}