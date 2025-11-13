"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

const selectTriggerVariants = cva(
    [
        "group inline-flex items-center justify-between gap-2 rounded-xl",
        "border border-gray-300 bg-white text-gray-800 font-medium shadow-sm",
        "outline-none transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:border-blue-500",
        "hover:border-blue-400 hover:bg-blue-50/50 active:bg-blue-100",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "data-[state=open]:border-blue-500 data-[state=open]:bg-blue-50 data-[state=open]:ring-2 data-[state=open]:ring-blue-500/40",
    ],
    {
        variants: {
            size: {
                sm: "h-8 px-2 text-sm",
                default: "h-10 px-3 text-sm",
                lg: "h-12 px-4 text-base",
            },
            width: {
                fit: "w-fit",
                full: "w-full",
            },
        },
        defaultVariants: {
            size: "default",
            width: "fit",
        },
    }
)

interface SelectTriggerProps
    extends ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> { }

function Select(props: ComponentProps<typeof SelectPrimitive.Root>) {
    return <SelectPrimitive.Root {...props} />
}

function SelectGroup(props: ComponentProps<typeof SelectPrimitive.Group>) {
    return <SelectPrimitive.Group {...props} />
}

function SelectValue(props: ComponentProps<typeof SelectPrimitive.Value>) {
    return <SelectPrimitive.Value {...props} />
}

function SelectTrigger({
    className,
    size,
    width,
    children,
    ...props
}: SelectTriggerProps) {
    return (
        <SelectPrimitive.Trigger
            className={cn(selectTriggerVariants({ size, width }), className)}
            {...props}
        >
            <span className="truncate">{children}</span>
            <SelectPrimitive.Icon asChild>
                <ChevronDownIcon className="size-4 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
}

function SelectContent({
    className,
    children,
    position = "popper",
    align = "center",
    ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                className={cn(
                    "z-50 min-w-(--radix-select-trigger-width) w-(--radix-select-trigger-width)",
                    "overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    position === "popper" &&
                    "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
                    className
                )}
                position={position}
                align={align}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport className="p-1">
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    )
}

function SelectLabel({
    className,
    ...props
}: ComponentProps<typeof SelectPrimitive.Label>) {
    return (
        <SelectPrimitive.Label
            className={cn("px-2 py-1.5 text-xs text-gray-500", className)}
            {...props}
        />
    )
}

function SelectItem({
    className,
    children,
    ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
    return (
        <SelectPrimitive.Item
            className={cn(
                "relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700 outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50",
                className
            )}
            {...props}
        >
            <span className="absolute right-2 flex size-3.5 items-center justify-center text-blue-600">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    )
}

function SelectSeparator({
    className,
    ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
    return (
        <SelectPrimitive.Separator
            className={cn("my-1 h-px bg-gray-200", className)}
            {...props}
        />
    )
}

function SelectScrollUpButton({
    className,
    ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
    return (
        <SelectPrimitive.ScrollUpButton
            className={cn("flex items-center justify-center py-1 text-gray-500", className)}
            {...props}
        >
            <ChevronUpIcon className="size-4" />
        </SelectPrimitive.ScrollUpButton>
    )
}

function SelectScrollDownButton({
    className,
    ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
    return (
        <SelectPrimitive.ScrollDownButton
            className={cn("flex items-center justify-center py-1 text-gray-500", className)}
            {...props}
        >
            <ChevronDownIcon className="size-4" />
        </SelectPrimitive.ScrollDownButton>
    )
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
}
