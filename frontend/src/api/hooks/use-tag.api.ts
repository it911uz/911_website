import { useQuery } from "@tanstack/react-query"
import { getTags } from "../tags/get-tags.api"
import type { BaseApiParams } from "@/types/share.type"

export const tagsQueryKey = {
    getTags: "get-all-tags",
}

export const useGetTags = ({ enabled, token, perPage, page }: GetTagsProps) => {
    return useQuery({
        queryKey: [tagsQueryKey.getTags, { perPage, page }],
        queryFn: async () => await getTags({ token, perPage, page }),
        enabled,
    });
}

interface GetTagsProps extends BaseApiParams {
    token?: string
    enabled?: boolean
}

