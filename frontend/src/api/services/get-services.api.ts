import { http } from "@/lib/https.util";
import type { Service } from "@/types/service.type";
import type { ActionResponse } from "@/types/share.type";

export const getServices = async (token?: string) => {
    return await http.get<ActionResponse<Service[]>>("services/", {
        token,
    });
};