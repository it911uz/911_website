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
        metadataBase: new URL("https://it911.uz/contacts"),

        title:
            "Контакты IT 911 — Связаться с нами | Contact | Aloqa — Разработка сайтов, CRM, ботов",

        description:
            "Свяжитесь с IT 911 Solutions — разработка сайтов, CRM, Telegram-ботов в Ташкенте. Телефон, адрес, график работы. IT 911 bilan bog‘laning — saytlar, CRM va Telegram botlar yaratish xizmati. Telefon, manzil, ish vaqti. Contact IT 911 Solutions — websites, CRM systems and Telegram bot development. Phone, address, business hours.",

        keywords: [
            "контакты IT компания", "IT 911 контакты", "связаться IT 911", "офис IT 911",
            "разработка сайтов Ташкент", "контакты веб студии", "телефон IT 911", "адрес IT 911",
            "разработка CRM Ташкент", "разработка ботов контакты",
            "IT 911 aloqa", "aloqa ma'lumotlari", "Toshkent IT kompaniya", "sayt yaratish aloqa",
            "CRM ishlab chiqish aloqa", "bot yaratish aloqa", "manzil IT 911", "telefon IT 911",
            "IT 911 contact", "contact web agency", "Tashkent digital solutions", "contact CRM developers",
            "bot development contact", "web studio contact", "IT services Tashkent",
        ],

        alternates: {
            canonical: "https://it911.uz/contacts",
        },

        category: "Контакты | Contacts",

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

        openGraph: {
            title: "Контакты IT 911 — Web, CRM, Bots",
            description:
                "Свяжитесь с IT 911 по вопросам разработки сайтов, CRM и ботов. | Aloqa | Contact",
            url: "https://it911.uz/contacts",
            type: "website",
            siteName: "IT 911 Solutions",
            images: [
                {
                    url: "/favicon/favicon-96x96.png",
                    width: 1200,
                    height: 630,
                    alt: "IT 911 — Контакты",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: "Контакты IT 911 — Web, CRM, Bots",
            description:
                "Свяжитесь с нами по вопросам разработки сайтов, CRM и Telegram-ботов.",
            images: ["/favicon/favicon-96x96.png"],
            site: "@it911_uz",
            creator: "@it911_uz",
        },

        authors: [{ name: "IT 911 Solutions", url: "https://it911.uz" }],
        publisher: "IT 911 Solutions",

        other: {
            "content-language": "ru, uz, en",
            "page-type": "contacts",
        },
    };
};

export default Page;