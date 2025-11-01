import { routing } from "@/i18n/routing";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: {
        default: "Авторизация и доступ к сервисам | IT 911 Solutions",
        template: "%s | IT 911",
    },

    description:
        "Войдите в систему IT 911, чтобы получить доступ к вашим проектам, CRM, ботам и аналитике. Безопасная авторизация для клиентов и партнёров.",

    keywords: [
        "авторизация IT 911",
        "вход в систему IT 911",
        "login IT 911",
        "IT 911 CRM вход",
        "IT 911 Uzbekistan",
        "авторизация пользователей",
        "IT 911 client portal",
        "CRM login",
        "войти в личный кабинет",
        "uzbekistan tech platform",
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
        title: "Авторизация | IT 911 Solutions",
        description:
            "Безопасный вход в систему IT 911 для клиентов и сотрудников. Войдите, чтобы управлять вашими проектами, CRM и ботами.",
        url: "https://it911.uz/auth",
        siteName: "IT 911 Solutions",
        type: "website",
        locale: "ru_RU",
        images: [
            {
                url: "/images/opengraph-login.jpg",
                width: 1200,
                height: 630,
                alt: "IT 911 — Авторизация",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Авторизация | IT 911 Solutions",
        description:
            "Войдите в систему IT 911 и управляйте цифровыми решениями для вашего бизнеса.",
        images: ["/images/opengraph-login.jpg"],
    },

    alternates: {
        canonical: "https://it911.uz/auth",
        languages: {
            ru: "https://it911.uz/ru/auth",
            en: "https://it911.uz/en/auth",
            uz: "https://it911.uz/uz/auth",
        },
    },
};

const AuthLayout = async ({ params, children }: LayoutProps<"/[locale]">) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <>
            <NuqsAdapter>{children}</NuqsAdapter>
        </>
    );
};

export default AuthLayout;
