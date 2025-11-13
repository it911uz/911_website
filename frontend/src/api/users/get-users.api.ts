import { http } from "@/lib/https.util"
import { createSearchParams } from "@/lib/utils"
import type { BaseApiParams, ResponseWithPagination } from "@/types/share.type"
import type { User } from "@/types/user.type"

export const getUsers = async ({ token }: Params) => {
    const searchParams = createSearchParams({});

    return await http.get<ResponseWithPagination<User[]>>("users/", {
        token,
        searchParams
    })
}

interface Params extends BaseApiParams {
    token?: string;
    query?: string
}