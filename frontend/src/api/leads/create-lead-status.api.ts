import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const createLeadStatus = ({ body, token }: Params) => {
    console.log(body);
    
    return http.post<ActionResponse<unknown>>("lead-statuses/", {
        token,
        json: body
    })
}

interface Params {
    body: {
        name: string;
        hex: string;
    }
    token?: string
}