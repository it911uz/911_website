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
            position="top-right"
            className="toaster group w-full! max-w-md! md:max-w-lg! lg:max-w-xl!"
            icons={{
                success: <CircleCheckIcon className="size-5 text-green-500" />,
                info: <InfoIcon className="size-5 text-blue-500" />,
                warning: <TriangleAlertIcon className="size-5 text-yellow-500" />,
                error: <OctagonXIcon className="size-5 text-red-600" />,
                loading: <Loader2Icon className="size-5 text-gray-500 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "#ffffff",
                    "--normal-text": "#111827",
                    "--normal-border": "#e5e7eb",
                    "--border-radius": "0.75rem",
                    "--normal-shadow":
                        "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.05)",

                    "--success-bg": "#ffffff",
                    "--success-text": "#16a34a",
                    "--error-bg": "#ffffff",
                    "--error-text": "#dc2626",
                    "--warning-bg": "#ffffff",
                    "--warning-text": "#b45309",
                    "--info-bg": "#ffffff",
                    "--info-text": "#2563eb",
                } as CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster }
