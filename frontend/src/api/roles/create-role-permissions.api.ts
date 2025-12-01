import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const createRolePermissions = async ({ token, body }: Params) => {
    return await http.post<ActionResponse<unknown>>("roles/assign-permissions/", {
        token,
        json: body
    });
};

interface Params {
    token?: string;
    body: {
        role_id: number;
        permissions: string[];
    };
}