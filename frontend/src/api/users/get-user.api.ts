import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";
import type { UserDetail } from "@/types/user.type";

export const getUser = async ({ token, id }: Params) => {
    return await http.get<ActionResponse<UserDetail>>(`users/${id}`, {
        token,
    });
};

interface Params {
    token?: string;
    id: number;
}
