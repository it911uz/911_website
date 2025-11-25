import { http } from "@/lib/https.util";
import type { Permission } from "@/types/permission.type";
import type { ActionResponse } from "@/types/share.type";

export const getPermissions = async (token?: string) => {
    return await http.get<ActionResponse<Permission[]>>("permissions/", {
        token,
    });
};