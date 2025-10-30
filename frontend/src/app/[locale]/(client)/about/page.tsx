import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Header } from "./_components/header";
import type { Metadata } from "next";
import { SectionHistory } from "./_components/history";

const Page = async ({ params }: PageProps<"/[locale]/about">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <>
        <Header />

        <SectionHistory />
    </>
}

export const generateMetadata = async (): Promise<Metadata> => {


    return {
        title: "О нас — Веб-сайты, CRM-системы и Боты",

        keywords: [
            "IT 911",
            "IT-компания",
            "разработка сайтов",
            "создание CRM-систем",
            "телеграм-боты",
            "автоматизация бизнеса",
            "цифровые решения",
            "Узбекистан",
            "digital-технологии",
        ],

        category: "IT-услуги, О компании",

        openGraph: {
            title: "IT 911: О нас — Веб-сайты, CRM-системы и Боты",
            siteName: 'IT 911',
            type: 'website',
        },

        twitter: {
            card: 'summary_large_image',
            title: "О нас — Веб-сайты, CRM-системы и Боты",
        },

        robots: {
            follow: true,
            index: true,
            googleBot: {
                follow: true,
                index: true,
                'max-snippet': -1,
                'max-image-preview': 'large',
            },
        },
        pinterest: {
            richPin: true,
        },
    };
};

export default Page;