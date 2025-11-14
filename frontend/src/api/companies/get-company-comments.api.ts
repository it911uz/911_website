import { http } from "@/lib/https.util";
import type { CompanyComment } from "@/types/company.type";
import type { ActionResponse } from "@/types/share.type";

export const getCompanyComments = async ({ token, id }: Params) => {
    return await http.get<ActionResponse<CompanyComment[]>>(`companies/${id}/comments`, {
        token,
    });
};

interface Params {
    token?: string;
    id: number;
}