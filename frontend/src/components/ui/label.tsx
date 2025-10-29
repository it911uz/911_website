"use client"

import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

function Label({
    className,
    required = false,
    ...props
}: ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
    return (
        <LabelPrimitive.Root
            data-slot="label"
            className={cn(
                "flex items-center gap-2 text-sm leading-none font-medium select-none text-gray-700",
                "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                {
                    "relative after:content-['*'] after:text-red-500 after:ml-0.5": required
                },
                className
            )}
            {...props}
        />
    )
}

export { Label }