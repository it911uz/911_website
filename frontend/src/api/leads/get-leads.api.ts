import { http } from "@/lib/https.util"
import { createSearchParams } from "@/lib/utils"
import type { Lead } from "@/types/leads.type"
import type { BaseApiParams, ResponseWithPagination } from "@/types/share.type"

export const getLeads = async ({ token, fromDate, toDate, orderBy, targetId }: Params) => {

    const searchParams = createSearchParams(
        {
            from_date: fromDate,
            to_date: toDate,
            order_by: orderBy,
            target_id: targetId
        }
    )

    return await http.get<ResponseWithPagination<Lead[]>>("leads/", {
        token,
        searchParams,
    })
}

interface Params extends BaseApiParams {
    token: string;
    targetId?: string;
    orderBy?: string;
    fromDate?: string;
    toDate?: string;
}