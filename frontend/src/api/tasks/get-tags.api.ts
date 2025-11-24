import { http } from "@/lib/https.util"
import type { ActionResponse } from "@/types/share.type";
import type { Tag } from "@/types/tasks.type";

export const getTags = async ({ token }: Params) => {
    return await http.get<ActionResponse<Tag[]>>("tags/", {
        token
    });
}

interface Params {
    token?: string
}