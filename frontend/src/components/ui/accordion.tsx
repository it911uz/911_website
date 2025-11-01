"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Accordion({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return (
        <AccordionPrimitive.Root
            data-slot="accordion"
            className={cn("divide-y divide-border/50 rounded-xl bg-card/60 backdrop-blur-sm shadow-sm transition-all", className)}
            {...props}
        />
    )
}

function AccordionItem({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn(
                "border-b border-border/30 last:border-b-0 transition-all duration-300 hover:bg-muted/40",
                className
            )}
            {...props}
        />
    )
}

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    // базовые стили
                    "flex flex-1 items-center justify-between py-4 px-4 text-left text-sm font-medium transition-all outline-none rounded-md",
                    // визуал
                    "hover:bg-accent/10 hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
                    "active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50",
                    // анимации
                    "[&[data-state=open]>svg]:rotate-180",
                    "group/accordion-trigger",
                    className
                )}
                {...props}
            >
                <span className="flex-1 select-none transition-colors duration-200">
                    {children}
                </span>
                <ChevronDownIcon
                    className="text-muted-foreground size-4 shrink-0 translate-y-0.5 transition-transform duration-300 group-data-[state=open]/accordion-trigger:rotate-180"
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
}

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className={cn(
                "overflow-hidden text-sm transition-all duration-300",
                "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "pb-4 px-4 text-muted-foreground leading-relaxed",
                    "bg-linear-to-b from-transparent to-muted/20 rounded-b-xl"
                )}
            >
                {children}
            </div>
        </AccordionPrimitive.Content>
    )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
