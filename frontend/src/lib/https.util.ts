import ky, { HTTPError, type Options } from "ky";
import { Env } from "@/configs/env.config";

const defaultHttp = ky.create({
    prefixUrl: `${Env.PUBLIC_API_URL}`,
});

const __http = async <T>(
    method: HttpMethod,
    url: Input,
    options: CustomOptions,
): Promise<HttpResponse<T>> => {
    try {
        const response = await defaultHttp(url, {
            method,
            ...options,
            hooks: {
                beforeRequest: [
                    (request) => {
                        if (options.token) {
                            request.headers.set("Authorization", `Bearer ${options.token}`);
                        }
                        return request;
                    },
                ],
            },
        });

        if (response.status === 204) {
            return {
                data: null as unknown as T,
                error: null,
                ok: true,
                status: response.status,
            };
        }

        const data = await response.json<T>();

        return {
            data,
            error: null,
            ok: true,
            status: response.status,
        };
    } catch (error: unknown) {
        if (options.mode === "no-cors") {
            return {
                data: null as unknown as T,
                error: null,
                ok: true,
                status: 204,
            };
        }
        if (error instanceof HTTPError) {
            let errorResponseData: T | null = null;
            try {
                const contentType = error.response?.headers.get("content-type");
                if (contentType?.includes("application/json")) {
                    errorResponseData = await error.response?.json<T>();
                }
            } catch {
                // Response is not JSON, leave errorResponseData as null
            }

            return {
                data: errorResponseData as T,
                error,
                ok: false,
                status: error.response?.status,
            };
        }

        return {
            data: error as T,
            error: error as HTTPError,
            ok: false,
            status: 500,
        };
    }
};

//MARK: External HTTP Client
// =================================================================
const __externalHttp = async <T>(
    method: HttpMethod,
    url: Input,
    options: Options,
): Promise<HttpResponse<T>> => {
    try {
        const response = await ky(url, {
            method,
            timeout: 2 * 60 * 1000, // 2 min
            ...options,
        });

        const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
        if (response.status !== 204 && isJson) {
            const data = await response.json<T>();
            return {
                data,
                error: null,
                ok: true,
                status: response.status,
            };
        }

        return {
            data: null as unknown as T,
            ok: true,
            status: response.status,
            error: null,
        };
    } catch (error: unknown) {
        if (error instanceof HTTPError) {
            let errorResponseData: T | null = null;
            try {
                const contentType = error.response.headers.get("content-type");
                if (contentType?.includes("application/json")) {
                    errorResponseData = await error.response.json<T>();
                }
            } catch {
                // Response is not JSON, leave errorResponseData as null
            }

            return {
                data: errorResponseData as T,
                error,
                ok: false,
                status: error.response.status,
            };
        }

        return {
            data: error as T,
            error: error as HTTPError,
            ok: false,
            status: 500,
        };
    }
};

type HttpResponse<T> = SuccessHTTPResponse<T> | ErrorHTTPResponse<T>;

type SuccessHTTPResponse<T> = {
    data: T;
    error: null;
    ok: true;
    status: number;
};

type ErrorHTTPResponse<T> = {
    data: T;
    error: HTTPError;
    ok: false;
    status: number;
};

type HttpMethod = "get" | "post" | "put" | "patch" | "head" | "delete";
type Input = string | URL | Request;

interface CustomOptions extends Options {
    token?: string;
}

export const http = {
    get: <T>(url: Input, options?: CustomOptions) =>
        __http<T>("get", url, options || {}),
    post: <T>(url: Input, options?: CustomOptions) =>
        __http<T>("post", url, options || {}),
    put: <T>(url: Input, options?: CustomOptions) =>
        __http<T>("put", url, options || {}),
    patch: <T>(url: Input, options?: CustomOptions) =>
        __http<T>("patch", url, options || {}),
    head: <T>(url: Input, options?: CustomOptions) =>
        __http<T>("head", url, options || {}),
    delete: <T>(url: Input, options?: CustomOptions) =>
        __http<T>("delete", url, options || {}),
};

/** HTTP client for external requests.
 * @requires `prefixUrl` in options to be set.
 */
export const externalHttp = {
    get: <T>(url: Input, options?: Options) =>
        __externalHttp<T>("get", url, options || {}),
    post: <T>(url: Input, options?: Options) =>
        __externalHttp<T>("post", url, options || {}),
    put: <T>(url: Input, options?: Options) =>
        __externalHttp<T>("put", url, options || {}),
    patch: <T>(url: Input, options?: Options) =>
        __externalHttp<T>("patch", url, options || {}),
    head: <T>(url: Input, options?: Options) =>
        __externalHttp<T>("head", url, options || {}),
    delete: <T>(url: Input, options?: Options) =>
        __externalHttp<T>("delete", url, options || {}),
};