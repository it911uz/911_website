import { http } from "@/lib/https.util";
import type { LeadSchemaType } from "@/schemas/lead.schema";
import type { Lead } from "@/types/leads.type";
import type { ActionResponse } from "@/types/share.type";

export const createLead = async ({ body }: Props) => {
    return await http.post<ActionResponse<Lead>>("leads/", {
        json: body
    });
};

interface Props {
    body: LeadSchemaType;
}