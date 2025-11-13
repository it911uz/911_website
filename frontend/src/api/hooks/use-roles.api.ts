import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../roles/get-roles.api";
import type { BaseApiParams } from "@/types/share.type";

export const queryRolesKey = {
    getRoles: (params: Record<string, unknown>) => ["get-all-roles", params],
}

export const useGetRoles = ({ page, perPage, token, query, enabled }: GetRolesParams) => {    
    return useQuery({
        queryKey: queryRolesKey.getRoles({ page, perPage, query }),
        queryFn: async () => await getRoles({ page, perPage, token, query }),
        enabled,
    });
}

interface GetRolesParams extends BaseApiParams {
    token?: string;
    query?: string;
    enabled?: boolean
}