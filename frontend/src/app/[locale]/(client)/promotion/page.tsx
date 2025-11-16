import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Header } from "./_components/header";
import { SectionPromo } from "./_components/content";
import type { Metadata } from "next";

const Page = async ({ params }: PageProps<"/[locale]/promotion">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <>
        <Header />

        <SectionPromo />
    </>
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        metadataBase: new URL("https://it911.uz/promotion"),

        title:
            "Акции и скидки / Aksiyalar / Promotions — IT 911 Solutions: Сайты, CRM, Боты",

        description:
            "Специальные акции, скидки и предложения от IT 911 Solutions на создание сайтов, CRM-систем и Telegram-ботов. Экономьте на цифровых решениях для бизнеса. IT 911 Solutions'dan saytlar, CRM tizimlari va Telegram botlariga maxsus aksiyalar va chegirmalar. Biznesingiz uchun raqamli yechimlarda tejang. Special promotions and discounts from IT 911 Solutions for websites, CRM systems and Telegram bots. Save on digital solutions for your business.",

        keywords: [
            "IT 911 акции", "скидки IT 911", "спецпредложения", "акции на сайты",
            "создание сайтов скидка", "CRM разработка скидка", "телеграм-бот скидка",
            "IT услуги акции", "разработка сайтов дешево", "скидка на разработку",
            "IT 911 aksiyalar", "chegirmalar", "maxsus takliflar", "sayt yaratish aksiyasi",
            "CRM chegirma", "bot yaratish aksiyasi", "IT xizmatlar chegirma",
            "arzon sayt yaratish", "raqamli yechimlar aksiyasi",
            "IT 911 promotions", "discount IT services", "special offers",
            "website discount", "CRM development discount",
            "telegram bot discount", "digital services sale", "IT deals",
        ],

        alternates: {
            canonical: "https://it911.uz/promotion",
        },

        category: "Акции, Скидки, IT-услуги",

        openGraph: {
            title: "Акции и скидки / Promotions — IT 911 Solutions",
            description:
                "Узнайте о текущих акциях и скидках на разработку сайтов, CRM и ботов. Saytlar, CRM va botlar uchun amaldagi aksiyalarni ko‘ring. Explore current promotions and discounts for websites, CRM and bots.",
            url: "https://it911.uz/promotion",
            type: "website",
            siteName: "IT 911 Solutions",
            images: [
                {
                    url: "/favicon/favicon-96x96.png",
                    width: 1200,
                    height: 630,
                    alt: "IT 911 Solutions — Promotions",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: "Акции и скидки / Aksiyalar / Promotions — IT 911",
            description:
                "Лучшие предложения на цифровые решения. Eng yaxshi chegirmalar va takliflar. Best deals on digital solutions.",
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
            "page-type": "promotion",
            "content-language": "ru, uz, en",
        },
    };
};


export default Page;