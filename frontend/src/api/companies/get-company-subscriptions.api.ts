import { http } from "@/lib/https.util";
import { createSearchParams } from "@/lib/utils";
import type { PaymentType } from "@/schemas/company.schema";
import type { CompanySubscription } from "@/types/company.type";
import type { ActionResponse } from "@/types/share.type";
import dayjs from "dayjs";

export const getCompanySubscriptions = async ({
    token, companyId, serviceId, paymentType, fromDate, toDate,
}: Params) => {

    const searchParams = createSearchParams({
        service_id__in: serviceId,
        payment_type: paymentType,
        start_date__gte: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
        end_date__lte: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
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