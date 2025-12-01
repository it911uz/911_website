import { http } from "@/lib/https.util";
import type { ServiceSchemaType } from "@/schemas/service.schema";
import type { ActionResponse } from "@/types/share.type";

export const updateService = async ({ body, token, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`services/${id}`, {
        token,
        json: body
    });
};

interface Params {
    body: ServiceSchemaType
    token?: string;
    id: number;
}