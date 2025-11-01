import type { ComponentProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Table
const TableWrapper = ({ className, children, ...props }: TableProps) => {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-lg border border-gray-200 bg-white pb-4",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

interface TableProps extends ComponentProps<"div"> { }

const Table = ({
    children,
    className,
    layout = "auto",
    fullWidth = false,
    ...props
}: TableWrapperProps) => {
    return (
        <table
            className={cn(
                "w-full overflow-hidden",
                {
                    "table-auto": layout === "auto",
                    "table-fixed": layout === "fixed",
                    "w-full": fullWidth === true,
                },
                className,
            )}
            {...props}
        >
            {children}
        </table>
    );
};

interface TableWrapperProps extends ComponentProps<"table"> {
    /** The layout of the table. */
    layout?: "fixed" | "auto";
    /** Whether the table should be full width. */
    fullWidth?: boolean;
}

// Table Header
const TableHeader = ({ className, children, ...props }: TableHeaderProps) => (
    <thead className={cn(className)} {...props}>
        <tr>{children}</tr>
    </thead>
);
interface TableHeaderProps extends ComponentProps<"thead"> { }

const TableHeaderCell = ({
    className,
    children,
    ...props
}: ComponentProps<"th">) => {
    return (
        <th
            className={cn(
                "p-5 text-left text-md font-bold text-slate-700",
                "border-b border-gray-200",
                "first:rounded-tl-2xl",
                "last:rounded-tr-2xl",
                className,
            )}
            {...props}
        >
            {children}
        </th>
    );
};

// Table Body
const TableBody = ({
    className,
    children,
    ...props
}: ComponentProps<"tbody">) => {
    return (
        <tbody className={cn(className)} {...props}>
            {children}
        </tbody>
    );
};

// Table Row
const TableRow = ({ children, className, ...props }: ComponentProps<"tr">) => {
    return (
        <tr
            className={cn("last:border-b-0", "overflow-hidden", className)}
            {...props}
        >
            {children}
        </tr>
    );
};

// Table Cell
const TableCell = ({ className, children, ...props }: TableCellProps) => {
    return (
        <td
            className={cn(
                "border-b border-gray-200 px-5 py-2.5 text-left text-xs text-gray-600",
                className,
            )}
            {...props}
        >
            {children}
        </td>
    );
};

interface TableCellProps extends ComponentProps<"td"> { }

const TableCaption = ({ className, ...props }: TableCaptionProps) => (
    <caption
        className={cn("text-gray-500 mt-4 text-sm", className)}
        {...props}
    />
);

interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> { }

const TableFooter = ({ className, ...props }: ComponentProps<"tfoot">) => {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                "bg-gray-50 border-t border-gray-200 font-medium [&>tr]:last:border-b-0",
                className,
            )}
            {...props}
        />
    );
};

export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TableWrapper,
};
