import { http } from "@/lib/https.util";
import type { LeadStatus } from "@/types/lead-status.type";
import type { ResponseWithPagination } from "@/types/share.type";

export const getLeadStatuses = async (token?: string) => {
    return await http.get<ResponseWithPagination<LeadStatus[]>>("lead-statuses", {
        token,
    });
};