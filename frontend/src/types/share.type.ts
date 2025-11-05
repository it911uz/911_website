export interface Name {
	ru: string;
	en: string;
	uz: string;
}

export type ResponseWithPagination<T> = {
	data: T;
	total: number;
	page: number;
	size: number;
	pages: number;
};

export interface Pagination {
	page: number;
	size: number;
	total: number;
	total_pages: number;
	has_next: boolean;
	has_prev: boolean;
}

export type ActionResponse<T> = T & { error?: ResponseError[] };

export interface BaseApiParams {
	page?: number;
	perPage?: number;
}

export interface ResponseError {
	path: string;
	error: Name;
}

export type GetById<T> = {
	data: T;
};
