import { http } from "@/lib/https.util";
import type { Company } from "@/types/company.type";
import type { ActionResponse } from "@/types/share.type";

export const getCompany = async ({ token, id }: Params) => {
    return await http.get<ActionResponse<Company>>(`companies/${id}`, {
        token,
    });
};

interface Params {
    token?: string;
    id: number;
}