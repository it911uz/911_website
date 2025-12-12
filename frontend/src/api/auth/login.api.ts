import { Env } from "@/configs/env.config";
import type { JWTType } from "@/types/jwt.type";

export const login = async ({ body }: Props) => {
    console.log("Login API called");
    console.log("API URL:", Env.PUBLIC_API_URL);
    const response = await fetch(Env.PUBLIC_API_URL + "/auth/token", {
        method: "POST",
        body
    });
    
    return {
        ok: response.ok,
        data: await response.json() as Pick<JWTType, "access_token" | "refresh_token" | "token_type">,
        status: response.status
    }
};

interface Props {
    body: FormData
}