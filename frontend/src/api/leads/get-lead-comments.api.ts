import { http } from "@/lib/https.util";
import type { LeadComment } from "@/types/leads.type";
import type { ResponseWithPagination } from "@/types/share.type";

export const getLeadComments = async ({lead_id, token}:Params) => {
    return await http.get<ResponseWithPagination<LeadComment[]>>(`leads/${lead_id}/comments`, {
        token,
    });
};

interface Params {
    lead_id: number;
    token?: string;
}