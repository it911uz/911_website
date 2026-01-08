import { http } from "@/lib/https.util";
import type { ActionResponse } from "@/types/share.type";

export const changePassword = async ({ token, body }: Params) => {
    return await http.post<ActionResponse<unknown>>("auth/change-password", {
        token,
        json: body
    });
};

interface Params {
    token: string;
    body: {
        old_password: string;
        new_password: string;
    }
}