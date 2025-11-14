import { http } from "@/lib/https.util";
import { createSearchParams } from "@/lib/utils";
import type { BaseApiParams, ResponseWithPagination } from "@/types/share.type";
import type { TaskStatus } from "@/types/tasks.type";

export const getTasksStatuses = async ({ token , page, perPage}: Params) => {

    const searchParams = createSearchParams({
        page,
        size: perPage
    });

    return await http.get<ResponseWithPagination<TaskStatus[]>>("task-statuses/", {
        token,
        searchParams,
    });
};

interface Params extends BaseApiParams {
    token?: string;
}