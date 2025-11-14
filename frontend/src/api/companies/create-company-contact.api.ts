import { http } from "@/lib/https.util";
import type { CompanyContactSchemaType } from "@/schemas/company.schema";
import type { ActionResponse } from "@/types/share.type";

export const createCompanyContact = async ({ token, data, id }: Params) => {
    return await http.post<ActionResponse<unknown>>(`companies/${id}/contacts/`, {
        token,
        json: data
    });
};

interface Params {
    token?: string
    data: CompanyContactSchemaType;
    id: number;
}