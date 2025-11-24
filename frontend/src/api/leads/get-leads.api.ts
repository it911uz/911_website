import { http } from "@/lib/https.util"
import { createSearchParams } from "@/lib/utils"
import type { Lead } from "@/types/leads.type"
import type { ActionResponse, BaseApiParams, ResponseWithPagination } from "@/types/share.type"

export const getLeads = async ({ token, fromDate, toDate, orderBy, targetId, page, perPage, statusIds }: Params) => {

    const searchParams = createSearchParams(
        {
            from_date: fromDate,
            to_date: toDate,
            order_by: orderBy,
            target_id: targetId,
            status_id__in: statusIds,
            page,
            size: perPage
        }
    )

    return await http.get<ActionResponse<Lead[]>>("leads/", {
        token,
        searchParams,
    })
}

interface Params extends BaseApiParams {
    token?: string;
    targetId?: string;
    orderBy?: string;
    fromDate?: string;
    toDate?: string;
    statusIds?: number[]
}