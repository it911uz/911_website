import { http } from "@/lib/https.util";
import type { PaymentsType } from "@/schemas/payments.schema";
import type { ActionResponse } from "@/types/share.type";

export const updateCompanyPayment = async ({ token, body, companyId, subscriptionId, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`companies/${companyId}/subscriptions/${subscriptionId}/payments/${id}`, {
        token,
        json: body
    });
};

interface Params {
    token?: string;
    body: PaymentsType;
    companyId: number;
    subscriptionId: number;
    id: number
}