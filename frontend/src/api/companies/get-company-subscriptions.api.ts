import { http } from "@/lib/https.util";
import { createSearchParams } from "@/lib/utils";
import type { PaymentType } from "@/schemas/company.schema";
import type { CompanySubscription } from "@/types/company.type";
import type { ActionResponse } from "@/types/share.type";

export const getCompanySubscriptions = async ({
    token, companyId, serviceId, paymentType, fromDate, toDate,
}: Params) => {

    const searchParams = createSearchParams({
        service_id__in: serviceId,
        payment_type_in: paymentType,
        start_date_lte: fromDate,
        start_date_gte: toDate,
    })
    return await http.get<ActionResponse<CompanySubscription[]>>(`companies/${companyId}/subscriptions/`, {
        token,
        searchParams,
    });
};

interface Params {
    token?: string;
    companyId: number;
    serviceId?: number;
    paymentType?: PaymentType;
    fromDate?: Date | null;
    toDate?: Date | null;
}