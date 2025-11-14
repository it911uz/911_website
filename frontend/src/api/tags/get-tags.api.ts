import { http } from "@/lib/https.util";
import { createSearchParams } from "@/lib/utils";
import type { BaseApiParams, ResponseWithPagination } from "@/types/share.type";
import type { Tag } from "@/types/tag.type";

export const getTags = async ({ token, page, perPage }: Params) => {

    const searchParams = createSearchParams({
        page,
        size: perPage
    });

    return await http.get<ResponseWithPagination<Tag[]>>("tags/", {
        token,
        searchParams
    });
};

interface Params extends BaseApiParams {
    token?: string
}