import { http } from "@/lib/https.util"
import { createSearchParams } from "@/lib/utils"
import type { Role } from "@/types/roles.type"
import type { BaseApiParams, ResponseWithPagination } from "@/types/share.type"

export const getRoles = async ({ page, perPage, token, query }: Params) => {

    const searchParams = createSearchParams({
        page,
        size: perPage,
        name__ilike: query
    });

    return await http.get<ResponseWithPagination<Role[]>>("roles/", {
        token,
        searchParams,
    })
}

interface Params extends BaseApiParams {
    token?: string;
    query?: string
}