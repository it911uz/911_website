import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"
import { Link } from "@/i18n/navigation"

const Breadcrumb = (props: ComponentProps<"nav">) => {
    return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

const BreadcrumbList = ({
    className,
    ...props
}: ComponentProps<"ol">) => {
    return (
        <ol
            data-slot="breadcrumb-list"
            className={cn(
                "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-gray-500 sm:gap-2.5",
                className
            )}
            {...props}
        />
    )
}

const BreadcrumbItem = ({
    className,
    ...props
}: ComponentProps<"li">) => {
    return (
        <li
            data-slot="breadcrumb-item"
            className={cn("inline-flex items-center gap-1.5", className)}
            {...props}
        />
    )
}

const BreadcrumbLink = ({
    asChild,
    className,
    ...props
}: ComponentProps<typeof Link> & {
    asChild?: boolean
}) => {
    const Comp = asChild ? Slot : Link

    return (
        <Comp
            data-slot="breadcrumb-link"
            className={cn(
                "transition-colors hover:text-gray-900",
                className
            )}
            {...props}
        />
    )
}

const BreadcrumbPage = ({
    className,
    ...props
}: ComponentProps<"span">) => {
    return (
        <span
            data-slot="breadcrumb-page"
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn("font-normal text-gray-900", className)}
            {...props}
        />
    )
}

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: ComponentProps<"li">) => {
    return (
        <li
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className={cn("[&>svg]:size-3.5 text-gray-400", className)}
            {...props}
        >
            {children ?? <ChevronRight />}
        </li>
    )
}

const BreadcrumbEllipsis = ({
    className,
    ...props
}: ComponentProps<"span">) => {
    return (
        <span
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn(
                "flex size-9 items-center justify-center text-gray-400",
                className
            )}
            {...props}
        >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">More</span>
        </span>
    )
}

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
}
