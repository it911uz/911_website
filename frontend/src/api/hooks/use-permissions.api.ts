import { useQuery } from "@tanstack/react-query"
import { getPermissions } from "../permissions/get-permissions.api"

export const permissionsQueryKey = {
    getPermissions: "get-permissions",
}

export const useGetPermissions = ({ token, enabled }: GetPermissionsProps) => {
    return useQuery({
        queryKey: [permissionsQueryKey.getPermissions],
        queryFn: async () => await getPermissions(token),
        enabled,
    })
}

interface GetPermissionsProps {
    token?: string
    enabled?: boolean
}