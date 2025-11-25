import { http } from "@/lib/https.util";
import type { PaymentsType } from "@/schemas/payments.schema";
import type { ActionResponse } from "@/types/share.type";

export const createCompanyPayment = async ({ token, body, companyId, subscriptionId }: Params) => {
    return await http.post<ActionResponse<unknown>>(`companies/${companyId}/subscriptions/${subscriptionId}/payments/`, {
        token,
        json: body
    });
};

interface Params {
    token?: string;
    body: PaymentsType;
    companyId: number;
    subscriptionId: number
}