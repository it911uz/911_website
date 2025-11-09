import { useQuery } from "@tanstack/react-query"
import { getLeadComments } from "../leads/get-lead-comments.api"

export const useLeadComments = ({ leadId, enabled, token }: LeadCommentsProps) => {
    return useQuery({
        queryKey: leadsQueryKey.comments.getComments(leadId),
        queryFn: async () => await getLeadComments({ lead_id: leadId, token }),
        enabled,
    })
}

interface LeadCommentsProps {
    enabled?: boolean;
    token?: string;
    leadId: number;
}

export const leadsQueryKey = {
    comments: {
        getComments: (leadId: number) => ['lead-comments', leadId],
    }
}