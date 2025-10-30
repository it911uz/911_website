"use server";

import { createLead } from "@/api/leads/create-lead.api";
import type { ContactSchemaType } from "@/schemas/contact.schema";

export const contactAction = async ({ body }: Props) => {

    return await createLead({ body });
};

interface Props {
    body: ContactSchemaType;
}