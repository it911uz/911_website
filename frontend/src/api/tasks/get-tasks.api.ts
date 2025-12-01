import { http } from "@/lib/https.util";
import { createSearchParams } from "@/lib/utils";
import type { ActionResponse, BaseApiParams } from "@/types/share.type";
import type { Task } from "@/types/tasks.type";

export const getTasks = async ({ token, page, perPage, query, status, users, tags }: Params) => {

    const searchParams = createSearchParams({
        page,
        size: perPage,
        q: query,
        status_id__in: status,
        users__id__in: users,
        tags__id__in: tags
    });

    return await http.get<ActionResponse<Task[]>>("tasks/", {
        token,
        searchParams,
    });
};

interface Params extends BaseApiParams {
    token?: string;
    query?: string;
    status?: number[];
    users?: number[];
    tags?: number[];
}