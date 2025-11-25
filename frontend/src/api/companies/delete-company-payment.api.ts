import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const deleteCompanyPayment = async ({ token, companyId, subscriptionId, id }: Params) => {
    return await http.post<ActionResponse<unknown>>(`companies/${companyId}/subscriptions/${subscriptionId}/payments/${id}`, {
        token,
    });
};

interface Params {
    token?: string;
    companyId: number;
    subscriptionId: number;
    id: number
}