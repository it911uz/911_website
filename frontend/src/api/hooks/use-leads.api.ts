import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getLeadComments } from "../leads/get-lead-comments.api"
import { getLeadFiles } from "../leads/get-lead-files.api";
import { getLeads } from "../leads/get-leads.api";
import { getLeadStatuses } from "../leads/get-lead-statuses.api";

export const leadsQueryKey = {
    comments: {
        getComments: (leadId: number) => ['lead-comments', leadId],
    },
    files: {
        getFiles: (leadId: number) => ['lead-files', leadId],
    },
    leads: {
        getInfiniteLeads: "infinite-leads",
    },
    status: {
        getLeadStatuses: "lead-statuses",
    }
}

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

export const useLeadFiles = ({ leadId, enabled, token }: LeadFilesProps) => {
    return useQuery({
        queryKey: leadsQueryKey.files.getFiles(leadId),
        queryFn: async () => await getLeadFiles({ lead_id: leadId, token }),
        enabled,
    })
}

interface LeadFilesProps {
    enabled?: boolean;
    token?: string;
    leadId: number;
}

export const useGetInfiniteLeads = ({ fromDate, toDate, targetId, orderBy, token, statusIds }: GetInfiniteLeadsProps) => {
    return useInfiniteQuery({
        queryKey: [leadsQueryKey.leads.getInfiniteLeads, { fromDate, toDate, targetId, orderBy, token, statusIds }],
        queryFn: async ({ pageParam = 1 }) => {
            return await getLeads({
                page: pageParam,
                fromDate,
                toDate,
                targetId,
                orderBy,
                token,
                statusIds
            })
        },
        getNextPageParam: (lastPage) => {
            if (lastPage?.data.size < lastPage?.data.total) {
                return lastPage.data.page + 1
            }
            return undefined;
        },
        initialData: () => {
            return {
                pages: [],
                pageParams: [],
            };
        },
        refetchOnWindowFocus: false,
        initialPageParam: 1,
        maxPages: 20,
        enabled: false,
    });
}

interface GetInfiniteLeadsProps {
    token?: string;
    targetId?: string;
    orderBy?: string;
    fromDate?: string;
    toDate?: string;
    statusIds?: number[]
}

export const useGetLeadStatuses = ({ token, enabled }: GetLeadStatusesProps) => {
    return useQuery({
        queryKey: [leadsQueryKey.status.getLeadStatuses],
        queryFn: async () => await getLeadStatuses(token),
        enabled,
    })
}

interface GetLeadStatusesProps {
    token?: string;
    enabled?: boolean
}