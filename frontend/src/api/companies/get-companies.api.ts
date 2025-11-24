import { http } from "@/lib/https.util";
import { createSearchParams } from "@/lib/utils";
import type { Company } from "@/types/company.type";
import type { BaseApiParams, ResponseWithPagination } from "@/types/share.type";

export const getCompanies = async ({ token, status, query, perPage, page }: Params) => {
    const searchParams = createSearchParams({
        page,
        size: perPage,
        status,
        q: query,
    });

    return await http.get<ResponseWithPagination<Company[]>>("companies/", {
        token,
        searchParams,
    });
};

interface Params extends BaseApiParams {
    token?: string;
    query?: string;
    status?: string | null;
}