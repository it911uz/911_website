import { cva } from "class-variance-authority";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import type { HtmlHTMLAttributes } from "react";
import { Pagination as HeadlessPagination } from "react-headless-pagination";
import { cn } from "@/lib/utils";

const paginationButtonStyles = cva(
	"cursor-pointer inline-flex items-center justify-center rounded-md text-base h-10 focus-visible:outline-2 border-2 border-gray-200 p-0 w-10 bg-white transition-colors",
	{
		variants: {
			hover: { hover: "hover:bg-gray-100" },
			disabled: {
				disabled: "disabled:pointer-events-none disabled:opacity-50",
			},
			truncated: { truncated: "block align-middle text-center" },
			active: { active: "bg-brand-blue! text-white" },
		},
	},
);

export const Pagination = ({
	page,
	totalPages,
	onPageChange,
	disabled = false,
	showPrevNext = true,
	showFirstLast = true,
	showPages = true,
	className,
	...props
}: PaginationProps) => {
	const currentPage = (page ?? 1) - 1;

	if (totalPages <= 1) {
		return null;
	}

	function handlePageChange(callbackPage: number) {
		if (disabled) {
			return;
		}
		const actualPage = callbackPage + 1;
		if (actualPage === page) {
			return;
		}

		onPageChange(actualPage);
	}

	function goToFirstPage() {
		handlePageChange(0);
	}

	function goToLastPage() {
		handlePageChange(totalPages - 1);
	}

	return (
		<div className={cn("flex justify-center", className)} {...props}>
			<HeadlessPagination
				currentPage={currentPage}
				edgePageCount={showFirstLast ? 0 : 2}
				middlePagesSiblingCount={2}
				totalPages={totalPages}
				setCurrentPage={handlePageChange}
				className={cn("flex list-none gap-x-2")}
				truncableClassName={paginationButtonStyles({
					truncated: "truncated",
					hover: "hover",
				})}
			>
				{showFirstLast ? (
					<button
						disabled={disabled || currentPage === 0}
						onClick={goToFirstPage}
						className={paginationButtonStyles({
							hover: "hover",
							disabled: "disabled",
						})}
						type="button"
					>
						<ChevronsLeft />
					</button>
				) : null}
				{showPrevNext ? (
					<div>
						<HeadlessPagination.PrevButton
							className={paginationButtonStyles({
								hover: "hover",
								disabled: "disabled",
							})}
						>
							<ChevronLeft />
						</HeadlessPagination.PrevButton>
					</div>
				) : null}
				{showPages ? (
					<HeadlessPagination.PageButton
						className={paginationButtonStyles({
							hover: "hover",
							disabled: "disabled",
						})}
						activeClassName={paginationButtonStyles({
							active: "active",
						})}
					/>
				) : null}
				{showPrevNext ? (
					<div>
						<HeadlessPagination.NextButton
							as={<button type="button" />}
							className={paginationButtonStyles({
								hover: "hover",
								disabled: "disabled",
							})}
						>
							<ChevronRight />
						</HeadlessPagination.NextButton>
					</div>
				) : null}
				{showFirstLast ? (
					<button
						disabled={
							disabled || totalPages <= 1 || currentPage === totalPages - 1
						}
						onClick={goToLastPage}
						type="button"
						className={paginationButtonStyles({
							hover: "hover",
							disabled: "disabled",
						})}
					>
						<ChevronsRight />
					</button>
				) : null}
			</HeadlessPagination>
		</div>
	);
};

interface PaginationProps extends HtmlHTMLAttributes<HTMLDivElement> {
	/** Active page  */
	page: number | null;
	/** Total amount of pages */
	totalPages: number;
	/** Callback when page is changed */
	onPageChange: (page: number) => void;
	/** Disable pagination */
	disabled?: boolean;
	/** Show previous and next buttons */
	showPrevNext?: boolean;
	/** Show first and last buttons */
	showFirstLast?: boolean;
	/** Show page numbers */
	showPages?: boolean;
}