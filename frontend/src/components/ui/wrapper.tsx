import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const wrapperVariants = cva(
    "grid",
    {
        variants: {
            column: {
                1: "grid-cols-1",
                2: "grid-cols-[240px_1fr]",
                3: "grid-cols-[240px_1fr_450px]",
            },
            md: {
                1: "md:grid-cols-1",
                2: "md:grid-cols-[240px_1fr]",
                3: "md:grid-cols-[240px_1fr_450px]",
            },
            lg: {
                1: "lg:grid-cols-1",
                2: "lg:grid-cols-[240px_1fr]",
                3: "lg:grid-cols-[240px_1fr_450px]",
            },
            xl: {
                1: "xl:grid-cols-1",
                2: "xl:grid-cols-[240px_1fr]",
                3: "xl:grid-cols-[240px_1fr_450px]",
            }
        },
        defaultVariants: {
            column: 2,
        },
    },
);

export const Wrapper = ({ className, column, md, xl, lg, ...props }: ComponentProps<"div"> &
    VariantProps<typeof wrapperVariants>) => {

    return (
        <div className={cn(wrapperVariants({ column, className, md, xl, lg }))} {...props} />
    );
}