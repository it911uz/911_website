import { http } from "@/lib/https.util";
import type { CompanyContact } from "@/types/company.type";
import type { ActionResponse } from "@/types/share.type";

export const getCompanyContacts = async ({ token, id }: Params) => {
    return await http.get<ActionResponse<CompanyContact[]>>(`companies/${id}/contacts/`, {
        token,
    });
};

interface Params {
    token?: string;
    id: number;
}