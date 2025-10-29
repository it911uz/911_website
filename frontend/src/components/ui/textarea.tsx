import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

export const textareaVariants = cva(
    "w-full min-h-[80px] rounded-lg border px-4 py-2 text-base text-gray-900 shadow-sm transition-all outline-none resize-y placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 aria-invalid:border-red-600 aria-invalid:ring-2 aria-invalid:ring-red-600/30",
    {
        variants: {
            border: {
                true: "border border-gray-300 rounded-lg",
                false: "border-0",
            },
            color: {
                default: "bg-[#333] text-white",
                light: "bg-white text-gray-900 border-gray-300"
            },
            sizes: {
                sm: "text-sm min-h-[60px]",
                md: "text-base min-h-[80px]",
                lg: "text-lg min-h-[100px]",
            },
            bordered: {
                true: "border border-gray-300 rounded-lg",
                false: "border-0",
            },
        },
        defaultVariants: {
            color: "default",
            sizes: "md",
            border: false
        }
    }
)

function Textarea({ className, color, sizes, bordered, ...props }: ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(textareaVariants({ color, sizes, bordered }),
                className
            )}
            {...props}
        />
    )
}

export { Textarea }