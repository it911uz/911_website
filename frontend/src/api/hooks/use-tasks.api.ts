import { useQuery } from "@tanstack/react-query";
import { getTasksStatuses } from "../tasks/get-task-statuses.api";

export const tasksQueryKey = {
    status: {
        getTasksStatuses: "get-tasks-statuses",
    },
}

export const useGetTasksStatuses = ({ token, enabled }: GetLeadStatusesProps) => {
    return useQuery({
        queryKey: [tasksQueryKey.status.getTasksStatuses],
        queryFn: async () => await getTasksStatuses({ token }),
        enabled,
    })
}

interface GetLeadStatusesProps {
    token?: string;
    enabled?: boolean
}
