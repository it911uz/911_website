import { toast } from "sonner";

export const toastErrorResponse = (response: ErrorResponse) => {
    if (!response) {
        toast.error("Ошибка сервера");
        return;
    }

    if (Array.isArray(response.detail)) {
        const messages = response.detail.map(d => d.msg).join("\n");
        toast.error(messages || "Что-то пошло не так");
        return;
    }

    toast.error(typeof response.detail === "string" ? response.detail : "Что-то пошло не так");
};


interface ErrorDetail {
    loc: (string | number)[];
    msg: string;
    type: string;
}

interface ErrorResponse {
    detail?: string | ErrorDetail[];
}