import { http } from "@/lib/https.util";
import type { CompanyContactSchemaType } from "@/schemas/company.schema";
import type { ActionResponse } from "@/types/share.type";

export const updateCompanyContact = async ({ token, body, id, companyId }: Params) => {
    return await http.put<ActionResponse<unknown>>(`companies/${companyId}/contacts/${id}`, {
        token,
        json: body
    });
};

interface Params {
    token?: string
    body: CompanyContactSchemaType;
    companyId: number;
    id: number
}