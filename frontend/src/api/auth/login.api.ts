import { Env } from "@/configs/env.config";
import type { JWTType } from "@/types/jwt.type";

export const login = async ({ body }: Props) => {
    try {
        const response = await fetch(`${Env.PUBLIC_API_URL}/auth/token`, {
            method: "POST",
            body,
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return {
                data: null,
                error: data ?? {
                    detail: "Неверный логин или пароль",
                },
                ok: false,
                status: response.status,
            };
        }

        return {
            data: data as LoginResponse,
            error: null,
            ok: true,
            status: response.status,
        };
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return {
            data: null,
            error: {
                detail: "Что-то пошло не так при авторизации. Попробуйте ещё раз",
            },
            ok: false,
            status: 500,
        };
    }
};

interface Props {
    body: FormData;
}

type LoginResponse = Pick<
    JWTType,
    "access_token" | "refresh_token" | "token_type"
>;
