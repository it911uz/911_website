import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ContactsContent } from "./_components/content";
import type { Metadata } from "next";
import { searchParamsCache } from "@/lib/search-params.util";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/contacts">) => {

    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <ContactsContent />
}

export const generateMetadata = async (): Promise<Metadata> => {

    return {

        title: "Контакты IT 911 | Разработка Сайтов, CRM, Ботов в Ташкенте (Uzbekistan) | Contact Us",
        description: "Свяжитесь с IT 911 для обсуждения вашего проекта по разработке сайта, внедрению CRM или созданию Telegram-бота. Контакты, адрес и часы работы в Ташкенте. Murojaat uchun aloqa ma'lumotlari. Get in touch for Web, CRM, and Bot development services.",
        keywords: [
            "контакты", "IT 911 контакты", "адрес Ташкент", "разработка сайтов контакты", "создание CRM", "интеграция ботов", "офис IT компании Ташкент", "телефон IT 911",
            "aloqa ma'lumotlari", "IT 911 aloqa", "Toshkent manzil", "sayt yaratish murojaat", "CRM ishlab chiqish", "bot integratsiyasi",
            "contact information", "IT 911 contact", "Tashkent address", "web development contact", "CRM services contact", "bot integration support",
            "contact us", "IT 911 contact", "Tashkent address", "web development contact", "CRM services contact", "bot integration support",
        ],

        category: "Контакты",

        robots: {
            follow: true,
            index: true,
            googleBot: {
                follow: true,
                index: true,
            },
        },
        pinterest: {
            richPin: true,
        },

    };
};

export default Page;