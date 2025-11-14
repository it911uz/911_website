import type { BaseApiParams } from "@/types/share.type";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../users/get-users.api";

export const usersQueryKey = {
    getUsers: "get-users",
}

export const useGetUsers = ({ token, enabled, perPage, page, query }: GetUsersProps) => {
    return useQuery({
        queryKey: [usersQueryKey.getUsers, { perPage, page, query }],
        queryFn: async () => await getUsers({ token, perPage, page, query }),
        enabled,
    });
}

interface GetUsersProps extends BaseApiParams {
    token?: string
    enabled?: boolean;
    query?: string
}