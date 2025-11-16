import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { searchParamsCache } from "@/lib/search-params.util";
import { AboutContent } from "./_components/about-content";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/about">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <AboutContent />
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        metadataBase: new URL("https://it911.uz/about"),

        title:
            "О нас / Biz haqimizda / About Us — IT 911 Solutions: Создание сайтов, CRM, Ботов и Автоматизация",

        description:
            "IT 911 Solutions — команда специалистов по созданию сайтов, CRM-систем и телеграм-ботов. Более 5 лет помогаем бизнесу автоматизировать процессы и масштабироваться с современными IT-решениями.  IT 911 Solutions — saytlar, CRM tizimlari va Telegram botlarini ishlab chiqadigan mutaxassislar jamoasi. Biz 5 yildan beri biznes jarayonlarini avtomatlashtirish va rivojlantirishga yordam beramiz. IT 911 Solutions is a team of experts in website development, CRM systems, and Telegram bots. Over 5 years of helping businesses automate and grow with advanced digital solutions.",

        keywords: [
            "IT 911", "О компании IT 911", "разработка сайтов", "создание CRM", "телеграм-боты",
            "автоматизация бизнеса", "IT услуги", "команда разработчиков", "история компании",
            "IT компания Узбекистан", "разработка под ключ",
            "IT 911", "kompaniya haqida", "veb-sayt yaratish", "CRM ishlab chiqish",
            "Telegram bot yaratish", "biznes avtomatlashtirish", "IT xizmatlar",
            "O‘zbekiston IT kompaniyasi", "tayyor yechimlar", "raqamli yechimlar",
            "IT 911 Solutions", "about company", "web development", "CRM development",
            "telegram bot development", "business automation", "IT services",
            "software team", "digital solutions Uzbekistan",
        ],

        alternates: {
            canonical: "https://it911.uz",
        },

        category: "IT-компания, О компании",

        openGraph: {
            title: "О нас / Biz haqimizda / About Us — IT 911 Solutions",
            description:
                "RU: Узнайте больше о IT 911 Solutions — команде разработчиков сайтов, CRM системы и телеграм-ботов. " +
                "UZ: IT 911 Solutions haqida ko‘proq ma’lumot — saytlar, CRM va botlar ishlab chiquvchi jamoa. " +
                "EN: Learn more about IT 911 Solutions — a team building websites, CRM systems and Telegram bots.",
            url: "https://it911.uz",
            type: "website",
            siteName: "IT 911 Solutions",
            images: [
                {
                    url: "/favicon/favicon-96x96.png",
                    width: 1200,
                    height: 630,
                    alt: "IT 911 Solutions — About Page",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: "О нас / Biz haqimizda / About Us — IT 911 Solutions",
            description:
                "RU: Кто мы? Команда IT 911 создаёт сайты, CRM и ботов. " +
                "UZ: Biz kimmiz? IT 911 — saytlar, CRM va botlar yaratadigan jamoa. " +
                "EN: Who are we? IT 911 builds websites, CRM systems and bots.",
            images: ["/favicon/favicon-96x96.png"],
            site: "@it911_uz",
            creator: "@it911_uz",
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-snippet": -1,
                "max-image-preview": "large",
                "max-video-preview": -1,
            },
        },

        authors: [{ name: "IT 911 Solutions", url: "https://it911.uz/" }],
        publisher: "IT 911 Solutions",

        other: {
            "page-type": "about",
            "content-language": "ru, uz, en",
        },
    };
};


export default Page;