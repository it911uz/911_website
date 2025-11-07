import { routing } from "@/i18n/routing";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { AppHeader } from "./_components/app-header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: {
        default: "Админ-панель | IT 911 Solutions",
        template: "%s | IT 911 Admin",
    },

    description:
        "Панель администратора IT 911 Solutions — управление пользователями, проектами, CRM и цифровыми решениями компании.",

    keywords: [
        "админ IT 911",
        "панель администратора",
        "управление проектами IT 911",
        "dashboard IT 911",
        "CRM админ",
        "IT 911 Solutions admin",
        "внутренняя панель управления",
        "IT 911 Uzbekistan",
    ],

    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            "max-snippet": 0,
            "max-image-preview": "none",
            "max-video-preview": 0,
        },
    },

    openGraph: {
        title: "Админ-панель | IT 911 Solutions",
        description:
            "Внутренняя админ-панель для управления проектами, клиентами и данными IT 911 Solutions.",
        url: "https://it911.uz/admin",
        siteName: "IT 911 Solutions",
        type: "website",
        locale: "ru_RU",
        images: [
            {
                url: "/favicon/favicon-512x512.png",
                width: 1200,
                height: 630,
                alt: "IT 911 — Админ-панель",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Админ-панель | IT 911 Solutions",
        description:
            "Панель администратора IT 911 — управление всеми цифровыми решениями компании в одном месте.",
        images: "/favicon/favicon-512x512.png",
    },

    alternates: {
        canonical: "https://it911.uz/admin",
        languages: {
            ru: "https://it911.uz/ru/admin",
            en: "https://it911.uz/en/admin",
            uz: "https://it911.uz/uz/admin",
        },
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
    category: "internal",
    metadataBase: new URL("https://it911.uz"),
};

const AdminLayout = async ({ params, children }: LayoutProps<"/[locale]">) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const session = await auth()

    return (
        <SidebarProvider>
            <NuqsAdapter>
                <SessionProvider session={session}>
                    <AppSidebar />

                    <main className="w-full">
                        <AppHeader />

                        {children}
                    </main>
                </SessionProvider>
            </NuqsAdapter>
        </SidebarProvider>
    );
};

export default AdminLayout;
