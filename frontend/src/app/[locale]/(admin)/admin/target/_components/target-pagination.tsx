"use client";

import { useQueryStates } from "nuqs";
import { useTransition } from "react";
import { Pagination } from "@/components/ui/pagination";
import { searchParamsParsers } from "@/lib/search-params.util";
import { cn } from "@/lib/utils";

export const TargetPagination = ({
	totalPages,
	className,
}: Props) => {
	const [{ page }, setSearchParams] = useQueryStates(searchParamsParsers);
	const [pending, startTransition] = useTransition();
	const onPageChange = (page: number) => {
		setSearchParams(
			{ page },
			{
				startTransition,
			},
		);
	};

	return (
		<Pagination
			data-pending={pending ? "" : undefined}
			className={cn("my-7", className)}
			page={page}
			totalPages={totalPages}
			onPageChange={onPageChange}
		/>
	);
};

interface Props {
	totalPages: number;
	className?: string;
}