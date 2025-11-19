import { http } from "@/lib/https.util";
import type { LeadStatus } from "@/types/leads.type";
import type { ActionResponse } from "@/types/share.type";

export const getLeadStatuses = async (token?: string) => {
    return await http.get<ActionResponse<LeadStatus[]>>("lead-statuses/", {
        token,
    });
};