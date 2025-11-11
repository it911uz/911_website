import { http } from "@/lib/https.util";
import type { LeadFile } from "@/types/leads.type";

export const getLeadFiles = async ({ lead_id, token }: Params) => {
    return await http.get<LeadFile[]>(`leads/${lead_id}/files/`, {
        token,
    });
};

interface Params {
    lead_id: number;
    token?: string;
}

