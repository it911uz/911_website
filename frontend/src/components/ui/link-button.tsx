import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import type { VariantProps } from "class-variance-authority";

export const LinkButton = ({
    children,
    className,
    size,
    variant,
    rounded,
    ...props
}: ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) => {
    return (
        <Link
        
            className={cn(
                buttonVariants({ variant, size, className }),
            )}
            {...props}
        >
            {children}
        </Link>
    );
};