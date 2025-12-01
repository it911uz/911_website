import { http } from "@/lib/https.util";
import type { LeadComment } from "@/types/leads.type";
import type { ActionResponse } from "@/types/share.type";

export const getLeadComments = async ({lead_id, token}:Params) => {
    return await http.get<ActionResponse<LeadComment[]>>(`leads/${lead_id}/comments/`, {
        token,
    });
};

interface Params {
    lead_id: number;
    token?: string;
}