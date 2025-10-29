"use client"

import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import type { CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group w-full! max-w-md! md:max-w-lg! lg:max-w-xl!"
            position="top-right"
            icons={{
                success: <CircleCheckIcon className="size-5 text-green-500" />,
                info: <InfoIcon className="size-5 text-blue-500" />,
                warning: <TriangleAlertIcon className="size-5 text-yellow-500" />,
                error: <OctagonXIcon className="size-5 text-red-600" />,
                loading: <Loader2Icon className="size-5 text-gray-500 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "0.75rem",
                    "--normal-shadow": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",

                    "--success-bg": "rgba(22, 163, 74, 0.9)",
                    "--success-text": "#fff",

                    "--error-bg": "rgba(220, 38, 38, 0.9)",
                    "--error-text": "#fff",

                    "--warning-bg": "rgba(251, 191, 36, 0.9)",
                    "--warning-text": "#1f2937",

                } as CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster }