import { http } from "@/lib/https.util";
import type { CompanySubscriptionSchemaType } from "@/schemas/company.schema";
import type { ActionResponse } from "@/types/share.type";

export const createCompanySubscription = async ({ token, data, companyId }: Params) => {
    return await http.post<ActionResponse<unknown>>(`companies/${companyId}/subscriptions/`, {
        token,
        json: data
    });
};

interface Params {
    token?: string;
    data: CompanySubscriptionSchemaType;
    companyId: number;
}