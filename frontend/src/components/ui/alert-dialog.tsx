"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { AlertTriangle, XCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

function AlertDialog({
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
    return (
        <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
    )
}

function AlertDialogPortal({
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
    return (
        <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
    )
}

function AlertDialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
    return (
        <AlertDialogPrimitive.Overlay
            data-slot="alert-dialog-overlay"
            className={cn(
                "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                className
            )}
            {...props}
        />
    )
}

function AlertDialogContent({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
    return (
        <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogPrimitive.Content
                data-slot="alert-dialog-content"
                className={cn(
                    "fixed left-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
                    "gap-5 rounded-2xl border border-border/40 bg-card p-6 shadow-2xl",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-95 sm:max-w-md",
                    className
                )}
                {...props}
            />
        </AlertDialogPortal>
    )
}

function AlertDialogHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-dialog-header"
            className={cn(
                "flex flex-col items-center gap-2 text-center sm:text-left sm:items-start",
                className
            )}
            {...props}
        />
    )
}

function AlertDialogFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-dialog-footer"
            className={cn(
                "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        />
    )
}

function AlertDialogTitle({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
    return (
        <AlertDialogPrimitive.Title
            data-slot="alert-dialog-title"
            className={cn(
                "flex items-center gap-2 text-lg font-semibold text-foreground",
                className
            )}
            {...props}
        >
            <AlertTriangle className="size-5 text-yellow-500" />
            {children}
        </AlertDialogPrimitive.Title>
    )
}

function AlertDialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
    return (
        <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
}

function AlertDialogAction({
    className,
    colors,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> & { colors: VariantProps<typeof buttonVariants>["variant"] }) {
    return (
        <AlertDialogPrimitive.Action
            className={cn(
                buttonVariants({ variant: colors }),
                "flex items-center gap-1.5",
                className
            )}
            {...props}
        >
            <CheckCircle2 className="size-4" />
            Confirm
        </AlertDialogPrimitive.Action>
    )
}

function AlertDialogCancel({
    className,
    colors,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> & { colors: VariantProps<typeof buttonVariants>["variant"] }) {
    return (
        <AlertDialogPrimitive.Cancel
            className={cn(
                buttonVariants({ variant: colors }),
                "flex items-center gap-1.5",
                className
            )}
            {...props}
        >
            <XCircle className="size-4" />
            Cancel
        </AlertDialogPrimitive.Cancel>
    )
}

export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
}
