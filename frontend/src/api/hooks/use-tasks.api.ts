import type { BaseApiParams } from "@/types/share.type";
import { useQuery } from "@tanstack/react-query";
import { getTasksStatuses } from "../tasks/get-task-statuses.api";

export const tasksQueryKey = {
    status: {
        getTasksStatuses: "get-tasks-statuses",
    },
}

export const useGetTasksStatuses = ({ token, enabled, perPage, page }: GetLeadStatusesProps) => {
    return useQuery({
        queryKey: [tasksQueryKey.status.getTasksStatuses],
        queryFn: async () => await getTasksStatuses({ token, perPage, page }),
        enabled,
    })
}

interface GetLeadStatusesProps extends BaseApiParams {
    token?: string;
    enabled?: boolean
}