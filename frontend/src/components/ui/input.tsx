"use client"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff } from "lucide-react"
import { useState, type ComponentProps } from "react"

export const inputVariants = cva(
    "w-full min-w-0 px-4 py-2 shadow-sm transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/30 aria-invalid:border-red-600 aria-invalid:ring aria-invalid:ring-red-600/30 rounded-2xl",
    {
        variants: {
            variant: {
                default: "text-gray-900",
                file: "file:mr-4 file:border-0 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-gray-700 file:bg-gray-100",
            },
            border: {
                true: "border border-gray-300 rounded-lg",
                false: "border-0",
            },
            color: {
                default: "bg-[#333] text-white",
                light: "bg-white text-gray-900 border-gray-300"
            },
            sizes: {
                sm: "h-9 text-sm",
                md: "h-10 text-base",
                lg: "h-12 text-lg",
            }
        },
        defaultVariants: {
            variant: "default",
            border: true,
            color: "default",
            sizes: "lg",
        }
    }
)

export function Input({ className, type, variant, border, color, sizes, ...props }: ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
    const [inputType, setInputType] = useState(type);

    const isPassword = type === "password";

    const isDarkBackground = color === 'default';

    return (
        <div className="relative flex items-center w-full">
            <input
                type={inputType}
                data-slot="input"
                className={cn(
                    inputVariants({ variant, border, color, sizes }),
                    isPassword && "pr-10",
                    className
                )}
                {...props}
            />
            {
                isPassword && (
                    <span
                        className={cn(
                            "absolute right-3 cursor-pointer transition-colors",
                            isDarkBackground ? "text-gray-400 hover:text-white dark:hover:text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-600"
                        )}
                        onClick={() => setInputType(inputType === "password" ? "text" : "password")}
                    >
                        {
                            inputType === "password" ? <EyeOff className="size-5" /> : <Eye className="size-5" />
                        }
                    </span>
                )
            }
        </div>
    )
}