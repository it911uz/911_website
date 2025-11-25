import { http } from "@/lib/https.util";
import type { CompanyPayment } from "@/types/company.type";
import type { ActionResponse } from "@/types/share.type";

export const getCompanyPayment = async ({ token, companyId, subscriptionId }: Params) => {
    return await http.get<ActionResponse<CompanyPayment[]>>(`companies/${companyId}/subscriptions/${subscriptionId}/payments/`, {
        token,
    });
};

interface Params {
    token?: string;
    companyId: number;
    subscriptionId: number;
}