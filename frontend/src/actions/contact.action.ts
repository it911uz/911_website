"use server";

import { createLead } from "@/api/leads/create-lead.api";
import type { LeadSchemaType } from "@/schemas/lead.schema";

export const contactAction = async ({ body }: Props) => {

    return await createLead({ body });
};

interface Props {
    body: Payload;
}

interface Payload extends LeadSchemaType {
    target_id: string | null
}