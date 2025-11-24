import { useQuery } from "@tanstack/react-query";
import { getServices } from "../services/get-services.api";

export const servicesQueryKey = {
    getServices: "get-all-services",
}

export const useGetServices = ({ token, enabled }: GetServicesParams) => {
    return useQuery({
        queryKey: [servicesQueryKey.getServices],
        queryFn: async () => await getServices(token),
        enabled,
    });
}

interface GetServicesParams {
    token?: string;
    enabled?: boolean;
}