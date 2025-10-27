import type { ClassValue } from "clsx";
import clsx from "clsx";
import type { Locale } from "next-intl";
import { twMerge } from "tailwind-merge";
import { Currency } from "@/const/currency.const";

// ===================================================
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(...inputs));
};

export const isActiveGroupPath = (path: string, page: string) => {
	return path.includes(page);
};

export const createSearchParams = (params: Record<string, unknown>) => {
	const searchParams = new URLSearchParams();
	for (const key in params) {
		if (
			params[key] !== undefined &&
			params[key] !== null &&
			params[key] !== ""
		) {
			searchParams.set(key, `${params[key]}`);
		}
	}
	return searchParams;
};

export const toMoney = (value: number | string) => {
	const roundedNumber = toRounded(Number(value));
	const formatted = new Intl.NumberFormat("ru-RU", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(roundedNumber);

	return formatted;
};

export const toRounded = (x: number) => {
	return Math.round(x * 100) / 100;
};

export const currency = (locale: Locale) => {
	return Currency[locale];
};
