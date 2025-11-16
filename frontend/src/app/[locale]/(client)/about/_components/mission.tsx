"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Container } from "@/components/widgets/container";
import { Wrapper } from "@/components/ui/wrapper";

const missionData = {
    title: { ru: "Миссия компании", uz: "Kompaniya missiyasi", en: "Company Mission" },
    text: {
        ru: "Показываем, как технологии могут работать на ваш успех — с правильным подходом к IT.",
        uz: "Texnologiyalar sizning muvaffaqiyatingiz uchun qanday xizmat qilishi mumkinligini ko'rsatamiz — to'g'ri IT yondashuvi bilan.",
        en: "We show how technology can work for your success — with the right approach to IT.",
    },

    valuesTitle: { ru: "Ценности компании", uz: "Kompaniya qadriyatlari", en: "Company Values" },

    values: [
        {
            id: 1,
            title: { ru: "Прозрачность и честность", uz: "Shaffoflik va halollik", en: "Transparency & Honesty" },
            text: {
                ru: "Строим доверительные отношения внутри команды и с клиентами.",
                uz: "Jamoa va mijozlar bilan ishonchli munosabatlar quramiz.",
                en: "We build trusting relationships within the team and with clients.",
            },
        },
        {
            id: 2,
            title: { ru: "Ответственность", uz: "Mas'uliyat", en: "Responsibility" },
            text: {
                ru: "Берём на себя обязательства перед клиентами, партнёрами и коллегами.",
                uz: "Mijozlar, hamkorlar va hamkasblar oldidagi majburiyatlarni bajarishga intilamiz.",
                en: "We take responsibility toward clients, partners, and colleagues.",
            },
        },
        {
            id: 3,
            title: { ru: "Вдохновлять и мотивировать", uz: "Ilhomlantirish va motivatsiya berish", en: "Inspire & Motivate" },
            text: {
                ru: "Мы влияем на людей своим примером, помогая им стремиться к лучшему.",
                uz: "Odamlarga o'z namunamiz bilan ta’sir qilamiz va ularga rivojlanishga yordam beramiz.",
                en: "We influence people by example, helping them grow and move in the right direction.",
            },
        },
    ],

    slogan: {
        ru: "Правильный IT для успеха и будущего",
        uz: "Kelajak va muvaffaqiyat uchun to‘g‘ri IT",
        en: "The Right IT for Success and the Future",
    },
};

export const SectionMission = () => {
    const locale = useLocale();

    return (
        <section
            className="relative py-32 md:py-56 bg-[#0e0e0e] overflow-hidden"
        >
            <div
                className="absolute inset-0 bg-[url('/images/mission.jpg')] bg-cover bg-center opacity-40 scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />

            <Container className="relative z-10">
                <Wrapper column={1} className="gap-20 md:gap-40">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl space-y-12"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide">
                            {missionData.title[locale]}
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl">
                            {missionData.text[locale]}
                        </p>

                        <h3 className="text-3xl md:text-5xl font-bold text-white pt-8">
                            {missionData.valuesTitle[locale]}
                        </h3>

                        <div className="space-y-12">
                            {missionData.values.map((value) => (
                                <motion.div
                                    key={value.id}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                    className="space-y-4"
                                >
                                    <h4 className="text-2xl md:text-3xl font-semibold text-[#ff4d4d]">
                                        {value.title[locale]}
                                    </h4>
                                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
                                        {value.text[locale]}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-3xl md:text-4xl font-black text-[#ff3b3b] pt-12 uppercase tracking-wider">
                            {missionData.slogan[locale]}
                        </p>
                    </motion.div>
                </Wrapper>
            </Container>
        </section>
    );
};
