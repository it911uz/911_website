import { http } from "@/lib/https.util";
import { createSearchParams } from "@/lib/utils";
import type { BaseApiParams, ResponseWithPagination } from "@/types/share.type";
import type { Target } from "@/types/target.type";

export const getTarget = async ({ token, isActive, page, perPage, query }: Params) => {
    const searchParams = createSearchParams({
        name__ilike: query,
        is_active: isActive,
        page,
        size: perPage
    });

    return await http.get<ResponseWithPagination<Target[]>>(`target/`, {
        token,
        searchParams
    });
};

interface Params extends BaseApiParams {
    token?: string;
    isActive: boolean;
    query?: string;
}