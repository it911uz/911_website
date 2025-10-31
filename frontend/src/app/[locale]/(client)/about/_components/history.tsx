"use client";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import AboutBgImage from "@public/images/about-bg-parallax.jpg";
import { Container } from "@/components/widgets/container";
import { Wrapper } from "@/components/ui/wrapper";
import Pic1 from "@public/images/about1.webp";
import Pic2 from "@public/images/about2.jpg";
import Pic3 from "@public/images/about3.jpg";
import type { Key } from "react";
import type { Name } from "@/types/share.type";
import { useLocale } from "next-intl";

const historyList: History[] = [
    {
        id: 1,
        label: {
            ru: "Основание IT 911",
            en: "Foundation of IT 911",
            uz: "IT 911 tashkil topishi",
        },
        year: {
            ru: "2024 год",
            en: "Year 2024",
            uz: "2024 yil",
        },
        description: [
            {
                ru: "Компания IT 911 была основана в 2024 году командой специалистов, стремящихся сделать цифровые технологии доступными для каждого бизнеса. Первые проекты были связаны с веб-разработкой и автоматизацией процессов.",
                en: "IT 911 was founded in 2024 by a team of professionals driven by the idea of making digital technologies accessible to every business. The first projects focused on web development and business process automation.",
                uz: "IT 911 2024 yilda raqamli texnologiyalarni har bir biznes uchun qulay qilish maqsadida tashkil etilgan. Dastlabki loyihalar veb-ishlab chiqish va biznes jarayonlarini avtomatlashtirishga qaratilgan edi.",
            },
            {
                ru: "С самого начала команда придерживалась принципов качества, прозрачности и доверия — ценностей, которые остаются неизменными по сей день.",
                en: "From the very beginning, the team adhered to principles of quality, transparency, and trust — values that remain unchanged to this day.",
                uz: "Boshidanoq jamoa sifat, shaffoflik va ishonch tamoyillariga amal qilib kelmoqda — bu qadriyatlar bugungi kunda ham o‘z kuchida.",
            },
        ],
        image: Pic1,
    },
    {
        id: 2,
        label: {
            ru: "Запуск CRM и Telegram-ботов",
            en: "Launch of CRM and Telegram Bots",
            uz: "CRM va Telegram botlar ishga tushirilishi",
        },
        year: {
            ru: "Ноябрь 2024",
            en: "November 2024",
            uz: "2024 yil noyabr",
        },
        description: [
            {
                ru: "В ноябре 2024 года IT 911 выпустила первые крупные корпоративные решения — CRM-системы и Telegram-ботов для малого и среднего бизнеса.",
                en: "In November 2024, IT 911 released its first major corporate solutions — CRM systems and Telegram bots for small and medium-sized businesses.",
                uz: "2024 yil noyabr oyida IT 911 kichik va o‘rta bizneslar uchun birinchi yirik yechimlarni — CRM tizimlari va Telegram botlarni ishga tushirdi.",
            },
            {
                ru: "Этот этап стал ключевым в развитии компании: была расширена команда, внедрены Agile-подходы и налажены партнёрства с IT-компаниями Узбекистана.",
                en: "This stage became crucial for the company's growth: the team expanded, Agile practices were introduced, and partnerships were established with IT firms in Uzbekistan.",
                uz: "Bu bosqich kompaniya rivojlanishida muhim rol o‘ynadi: jamoa kengaytirildi, Agile yondashuvlari joriy etildi va O‘zbekistondagi IT kompaniyalar bilan hamkorlik yo‘lga qo‘yildi.",
            },
        ],
        image: Pic2,
    },
    {
        id: 3,
        label: {
            ru: "Цифровая трансформация",
            en: "Digital Transformation",
            uz: "Raqamli transformatsiya",
        },
        year: {
            ru: "2025 год",
            en: "Year 2025",
            uz: "2025 yil",
        },
        description: [
            {
                ru: "К октябрю 2025 года IT 911 превратилась в полноценную digital-компанию, предоставляющую комплексные решения по цифровой трансформации, CRM, автоматизации и веб-разработке.",
                en: "By October 2025, IT 911 evolved into a full-fledged digital company offering comprehensive solutions in digital transformation, CRM, automation, and web development.",
                uz: "2025 yil oktabr oyiga kelib, IT 911 raqamli transformatsiya, CRM, avtomatlashtirish va veb-ishlab chiqish bo‘yicha to‘liq xizmat ko‘rsatuvchi raqamli kompaniyaga aylandi.",
            },
            {
                ru: "Компания продолжает внедрять инновации и укреплять позиции как ведущий интегратор цифровых решений в Узбекистане.",
                en: "The company continues to innovate and strengthen its position as a leading digital solutions integrator in Uzbekistan.",
                uz: "Kompaniya innovatsiyalarni joriy etishda davom etmoqda va O‘zbekistondagi yetakchi raqamli yechimlar integratori sifatida o‘z o‘rnini mustahkamlamoqda.",
            },
        ],
        image: Pic3,
    },
];

export const SectionHistory = () => {

    const locale = useLocale();

    return (
        <ParallaxProvider>
            <section className="min-h-screen relative" aria-hidden="true">
                <Parallax
                    speed={-20}
                    className="absolute -top-[18px] left-0 bottom-0 right-0"
                >
                    <Image
                        src={AboutBgImage}
                        alt="Фон истории IT 911"
                        width={1920}
                        height={1080}
                        priority
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                </Parallax>
            </section>

            <section
                data-slot="history"
                className="relative overflow-hidden bg-[#282728] py-20 md:py-40 text-white overflow-x-hidden"
            >
                <Container>
                    <div className="space-y-40 md:space-y-64">
                        {historyList.map((item) => (
                            <Wrapper
                                key={item.id}
                                className="py-6 md:py-9 gap-10 relative"
                                column={1}
                                md={2}
                            >
                                <Parallax speed={10}>
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                                        ~ {item.label[locale]}
                                    </h2>
                                </Parallax>

                                <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center max-w-6xl ml-auto">
                                    <div className="relative pt-6">
                                        <time
                                            dateTime={item.year[locale]}
                                            className="text-3xl md:text-5xl font-bold whitespace-nowrap"
                                        >
                                            {item.year[locale]}
                                        </time>
                                    </div>

                                    <Parallax speed={10} className="flex-1 space-y-8">
                                        <motion.div
                                            initial={{ opacity: 0, x: -80 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 1.2 }}
                                            viewport={{ once: true }}
                                            className="space-y-8 text-lg leading-relaxed"
                                        >
                                            {item.description.map((text, i) => (
                                                <p key={i}>{text[locale]}</p>
                                            ))}
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 1.2 }}
                                            viewport={{ once: true }}
                                            className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl"
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.label[locale]}
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.div>
                                    </Parallax>
                                </div>
                            </Wrapper>
                        ))}
                    </div>
                </Container>
            </section>
        </ParallaxProvider>
    );
};


interface History {
    id: Key;
    label: Name;
    year: Name;
    description: Name[];
    image: string | StaticImageData;
}