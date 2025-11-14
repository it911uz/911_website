"use client";

import { useLinkStatus } from "next/link";
import { Loader } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Hint = ({ children, className, ...props }: ComponentProps<"div">) => {
    const { pending } = useLinkStatus();

    return (
        <div
            aria-hidden
            className={cn(`inline-flex items-center gap-5 text-sm font-medium transition-all duration-300`)}
            {...props}
        >
            {pending ? <Loader className="h-4 w-4 animate-spin" /> : children}
        </div>
    );
};

