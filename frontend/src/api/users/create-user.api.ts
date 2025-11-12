import { http } from "@/lib/https.util"
import type { EmploySchemaType } from "@/schemas/employ.schema"
import type { ActionResponse } from "@/types/share.type"

export const createUser = async ({ token, body }: Params) => {
    return await http.post<ActionResponse<unknown>>("users/", {
        token,
        json: body
    })
}

interface Params {
    body: EmploySchemaType;
    token?: string;
}