import { Env } from '@/configs/env.config';
import ky, { type Input, type Options, HTTPError } from 'ky';

const __createHttp = ky.create({
    prefixUrl: Env.PUBLIC_API_URL
});

const __internalHttp = async <T>(method: HTTPMethod, url: Input, options: CustomOptions): Promise<HttpResponse<T>> => {
    try {
        const response = await __createHttp(url, {
            method,
            timeout: 10 * 60 * 1000,
            ...options,
            hooks: {
                beforeRequest: [
                    (request) => {
                        if (!options.token) {
                            request.headers.set("Authorization", `Bearer ${options.token}`);
                        }
                        return request
                    }
                ]
            }
        });

        const isJson = response.headers.get("content-type")?.includes("application/json");

        if (response.status !== 204 && isJson) {
            const data = await response.json<T>();

            return {
                data,
                error: null,
                ok: true,
                status: response.status,
            }
        }

        return {
            data: null as unknown as T,
            error: null,
            ok: true,
            status: response.status,
        }
    } catch (error) {
        if (error instanceof HTTPError) {
            const data = await error.response.json<T>();

            return {
                data,
                error,
                ok: false,
                status: error.response.status,
            }
        }

        return {
            data: error as T,
            error: error as HTTPError,
            ok: false,
            status: 500
        }
    }
}


export const http = {
    get<T>(url: Input, options?: CustomOptions) {
        return __internalHttp<T>("get", url, options ?? {});
    },
    post<T>(url: Input, options?: Options) {
        return __internalHttp<T>("post", url, options ?? {});
    },
    patch<T>(url: Input, options?: Options) {
        return __internalHttp<T>("patch", url, options ?? {});
    },
    delete<T>(url: Input, options?: Options) {
        return __internalHttp<T>("delete", url, options ?? {});
    }
}

type HttpResponse<T> = SuccessResponse<T> | ErrorResponse<T>;

type SuccessResponse<T> = {
    data: T;
    error: null;
    ok: true;
    status: number;
};

type ErrorResponse<T> = {
    data: T;
    error: HTTPError;
    ok: false;
    status: number;
};

type HTTPMethod = "get" | "post" | "patch" | "delete";

interface CustomOptions extends Options {
    token?: string;
}