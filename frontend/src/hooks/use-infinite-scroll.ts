import type { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useEffect } from "react";

export function useInfiniteScroll({
	entry,
	hasNextPage,
	fetchNextPage,
}: UseInfiniteScrollProps) {
	useEffect(() => {
		if (entry?.isIntersecting && hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, entry]);
}

interface UseInfiniteScrollProps {
	entry: IntersectionObserverEntry | null;
	hasNextPage?: boolean;
	fetchNextPage: () => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
	enabled?: boolean;
}