"use client";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import PromoBgImage from "@public/images/promo-bg.jpg";
import { Container } from "@/components/widgets/container";
import { Wrapper } from "@/components/ui/wrapper";
import Pic1 from "@public/images/promo1.jpg";
import Pic2 from "@public/images/promo2.jpg";
import Pic3 from "@public/images/promo3.jpg";
import type { Key } from "react";
import type { Name } from "@/types/share.type";
import { useLocale, useTranslations } from "next-intl";

const promoList: Promo[] = [
    {
        id: 1,
        label: {
            ru: "Супер скидки для новых клиентов",
            en: "Super discounts for new clients",
            uz: "Yangi mijozlar uchun super chegirmalar",
        },
        description: [
            {
                ru: "Начните сотрудничество с IT 911 с выгодой! При первом заказе вы получаете персональную скидку на все услуги. Воспользуйтесь предложением прямо сейчас и оцените качество наших решений.",
                en: "Start working with IT 911 with great benefits! Get a personal discount on all services with your first order. Take advantage of the offer now and experience the quality of our solutions.",
                uz: "IT 911 bilan hamkorlikni foydali boshlang! Birinchi buyurtmada barcha xizmatlarga shaxsiy chegirma oling. Taklifdan hozir foydalaning va xizmatlarimiz sifatini sinab ko‘ring.",
            },
            {
                ru: "Акция действует ограниченное время — не упустите шанс начать проект по сниженной цене.",
                en: "The offer is for a limited time — don’t miss your chance to start your project at a lower cost.",
                uz: "Aksiya cheklangan muddatda amal qiladi — loyihangizni arzonroq narxda boshlash imkoniyatini qo‘ldan boy bermang.",
            },
        ],
        image: Pic1,
    },
    {
        id: 2,
        label: {
            ru: "Пакетные предложения и бонусы",
            en: "Bundle offers and bonuses",
            uz: "To‘plam takliflar va bonuslar",
        },
        description: [
            {
                ru: "Выберите несколько услуг сразу — и получите дополнительную выгоду! Чем больше решений вы заказываете, тем выше ваша скидка. Мы ценим комплексный подход и поощряем клиентов, выбирающих всё в одном месте.",
                en: "Order several services at once and get extra benefits! The more you order, the higher your discount. We value an integrated approach and reward clients who choose everything in one place.",
                uz: "Bir nechta xizmatni birdaniga tanlang — va qo‘shimcha foyda oling! Qancha ko‘p xizmat tanlasangiz, chegirma shuncha katta. Biz kompleks yondashuvni qadrlaymiz va bir joyda hamma narsani tanlagan mijozlarni rag‘batlantiramiz.",
            },
            {
                ru: "Пакеты доступны для веб-разработки, CRM, автоматизации, Telegram-ботов и маркетинга.",
                en: "Bundles are available for web development, CRM, automation, Telegram bots, and marketing.",
                uz: "To‘plamlar veb-ishlab chiqish, CRM, avtomatlashtirish, Telegram botlar va marketing uchun mavjud.",
            },
        ],
        image: Pic2,
    },
    {
        id: 3,
        label: {
            ru: "Программа лояльности IT 911",
            en: "IT 911 loyalty program",
            uz: "IT 911 sodiqlik dasturi",
        },
        description: [
            {
                ru: "Каждый наш клиент получает доступ к накопительной программе: чем больше вы работаете с нами, тем выгоднее становятся условия. Скидки, бонусные часы поддержки и приоритетное обслуживание — всё это доступно постоянным партнёрам.",
                en: "Every client gains access to our loyalty program: the more you work with us, the better the conditions. Discounts, bonus support hours, and priority service are all available to our regular partners.",
                uz: "Har bir mijozimiz sodiqlik dasturiga kirish imkoniyatiga ega: qancha ko‘p ishlasangiz, shuncha foyda olasiz. Chegirmalar, qo‘shimcha yordam soatlari va ustuvor xizmat — bularning barchasi doimiy hamkorlarimiz uchun mavjud.",
            },
            {
                ru: "Присоединяйтесь сегодня и начните экономить на каждом проекте вместе с IT 911.",
                en: "Join today and start saving on every project with IT 911.",
                uz: "Bugunoq qo‘shiling va IT 911 bilan har bir loyihada tejashni boshlang.",
            },
        ],
        image: Pic3,
    },
];

export const SectionPromo = () => {
    const locale = useLocale();

    const t = useTranslations("PromoPage.content");

    return (
        <ParallaxProvider>
            <section className="min-h-screen relative" aria-hidden="true">
                <Parallax
                    speed={-20}
                    className="absolute -top-[18px] left-0 bottom-0 right-0"
                >
                    <Image
                        src={PromoBgImage}
                        alt="Фон акции IT 911"
                        width={1920}
                        height={1080}
                        priority
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                </Parallax>
            </section>

            <section
                data-slot="promo"
                className="relative overflow-hidden bg-[#282728] py-20 md:py-40 text-white overflow-x-hidden"
            >
                <Container>
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-6xl font-black tracking-wide uppercase text-[#ff2b2b] mb-6">
                            {t("title")}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </div>

                    <div className="space-y-40 md:space-y-64">
                        {promoList.map((item) => (
                            <Wrapper
                                key={item.id}
                                className="py-6 md:py-9 gap-10 relative"
                                column={1}
                                md={2}
                            >
                                <Parallax speed={10}>
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-[#ff3b3b]">
                                        ~ {item.label[locale]}
                                    </h3>
                                </Parallax>

                                <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center max-w-6xl ml-auto">
                                    <Parallax speed={10} className="flex-1 space-y-8">
                                        <motion.div
                                            initial={{ opacity: 0, x: -80 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 1.2 }}
                                            viewport={{ once: true }}
                                            className="space-y-8 text-lg leading-relaxed text-gray-200"
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
                                            className="relative w-full h-[450px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl"
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

interface Promo {
    id: Key;
    label: Name;
    description: Name[];
    image: string | StaticImageData;
}
