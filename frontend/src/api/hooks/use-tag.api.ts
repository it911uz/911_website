import { useQuery } from "@tanstack/react-query"
import { getTags } from "../tags/get-tags.api"

export const tagsQueryKey = {
    getTags: "get-all-tags",
}

export const useGetTags = ({ enabled, token, }: GetTagsProps) => {
    return useQuery({
        queryKey: [tagsQueryKey.getTags],
        queryFn: async () => await getTags({ token, }),
        enabled,
    });
}

interface GetTagsProps {
    token?: string;
    enabled?: boolean
}
