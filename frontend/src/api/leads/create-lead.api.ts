import { http } from "@/lib/https.util";
import type { Lead } from "@/types/leads.type";
import type { ActionResponse } from "@/types/share.type";

export const createLead = async ({ body }: Props) => {
    return await http.post<ActionResponse<Lead>>("leads/", {
        json: body
    });
};

interface Props {
    body: Omit<Lead, "id" | "target_id" | "status">;
}