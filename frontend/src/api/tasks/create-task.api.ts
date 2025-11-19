import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type"

export const createTask = async ({ body, token }: Params) => {
    return await http.post<ActionResponse<unknown>>("tasks/", {
        token,
        json: body
    })
}

interface Params {
    body: {

    }
    token?: string
}