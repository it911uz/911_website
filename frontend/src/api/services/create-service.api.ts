import { http } from "@/lib/https.util";
import type { ServiceSchemaType } from "@/schemas/service.schema";
import type { ActionResponse } from "@/types/share.type";

export const createService = async ({ body, token }: Params) => {
    return await http.post<ActionResponse<unknown>>("services/", {
        token,
        json: body
    });
};

interface Params {
    body: ServiceSchemaType
    token?: string
}