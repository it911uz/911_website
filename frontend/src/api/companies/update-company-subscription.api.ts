import { http } from "@/lib/https.util";
import type { CompanySubscriptionSchemaType } from "@/schemas/company.schema";
import type { ActionResponse } from "@/types/share.type";

export const updateCompanySubscription = async ({ token, data, companyId, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`companies/${companyId}/subscriptions/${id}`, {
        token,
        json: data
    });
};

interface Params {
    token?: string;
    data: CompanySubscriptionSchemaType;
    companyId: number;
    id: number;
}