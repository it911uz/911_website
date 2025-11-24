import { Env } from "@/configs/env.config";

export const uploadTaskFile = async ({ taskId, body, token }: Params) => {
    return await fetch(`${Env.PUBLIC_API_URL}/tasks/${taskId}/files/`, {
        method: "POST",
        body,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};

interface Params {
    taskId: number;
    body: FormData;
    token?: string;
}