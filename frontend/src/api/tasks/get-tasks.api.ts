import { http } from "@/lib/https.util";
import { createSearchParams } from "@/lib/utils";
import type { BaseApiParams, ResponseWithPagination } from "@/types/share.type";
import type { TaskStatus } from "@/types/tasks.type";

export const getTasks = async ({ token, page, perPage, query, deadline }: Params) => {

    const searchParams = createSearchParams({
        page,
        size: perPage,
        name__ilike: query,
        deadline__gte: deadline
    });

    return await http.get<ResponseWithPagination<TaskStatus[]>>("tasks/", {
        token,
        searchParams,
    });
};

interface Params extends BaseApiParams {
    token?: string;
    query?: string;
    deadline?: string;
}