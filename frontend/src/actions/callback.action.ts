"use server";

import type { CallBackSchemaType } from "@/schemas/home.schema";

export const callbackAction = async ({companyName, email, fullName, phone}:CallBackSchemaType) => {
    const response = await fetch("http://95.182.118.118:8000/leads/", {
        method: "POST",
        body: JSON.stringify({company_name:companyName, email, full_name: fullName, phone}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
};