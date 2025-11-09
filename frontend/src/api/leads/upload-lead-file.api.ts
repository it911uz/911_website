import { Env } from "@/configs/env.config";
import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const uploadLeadFile = async ({ lead_id, body, token }: Params) => {
    return await fetch(`${Env.PUBLIC_API_URL}/leads/${lead_id}/files/`, {
        method: "POST",
        body,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};

interface Params {
    lead_id: number;
    body: FormData;
    token?: string;
}