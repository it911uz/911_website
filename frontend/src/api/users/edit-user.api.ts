import { http } from "@/lib/https.util";
import type { EmploySchemaType } from "@/schemas/employ.schema";
import type { ActionResponse } from "@/types/share.type";

export const editUser = async ({ token, body, id }: Params) => {
    return await http.put<ActionResponse<unknown>>(`users/${id}`, {
        token,
        json: body
    });
};

interface Params {
    token?: string;
    body: Omit<EmploySchemaType, "password">;
    id: number
}