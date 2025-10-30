"use client";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutBgImage from "@public/images/about-bg-parallax.jpg"
import { Container } from "@/components/widgets/container";
import { Wrapper } from "@/components/ui/wrapper";
import Pic1 from "@public/images/about1.webp"
import Pic2 from "@public/images/about2.jpg"
import Pic3 from "@public/images/about3.jpg"

const historyList = [
    {
        id: 1,
        label: "История IT 911",
        year: "2024 год",
        description: [
            "Компания IT 911 была основана в 2024 году группой специалистов, объединённых идеей сделать цифровые технологии доступными для каждого бизнеса. Первые проекты были связаны с разработкой веб-сайтов и автоматизацией бизнес-процессов.",
            "С самого начала команда сосредоточилась на качестве, прозрачности и доверии — принципах, которые до сих пор лежат в основе философии IT 911."
        ],
        image: Pic1
    },
    {
        id: 2,
        label: "Запуск CRM и Телеграм-ботов",
        year: "Ноябрь",
        description: [
            "В ноябре 2024 года IT 911 успешно завершила свои первые крупные корпоративные внедрения CRM-систем и автоматизированных Телеграм-ботов для малого и среднего бизнеса.",
            "Это стало отправной точкой для расширения команды, внедрения Agile-подходов и начала активного сотрудничества с технологическими партнёрами в Узбекистане."
        ],
        image: Pic2
    },
    {
        id: 3,
        label: "Цифровая трансформация",
        year: "2025 год",
        description: [
            "К октябрю 2025 года IT 911 превратилась в комплексную digital-компанию, предоставляющую решения по цифровой трансформации, внедрению CRM, автоматизации и веб-разработке.",
            "Компания продолжает внедрять инновации, укреплять партнёрства и стремится стать ведущим интегратором цифровых решений в Узбекистане, помогая клиентам масштабировать свой бизнес."
        ],
        image: Pic3
    },
] as const

export const SectionHistory = () => {
    return (
        <ParallaxProvider>

            <section className="min-h-screen relative" aria-hidden="true">
                <Parallax speed={-20} className="absolute -top-[18px] left-0 bottom-0 right-0">
                    <Image
                        src={AboutBgImage}
                        alt="Футуристический фон истории компании IT 911"
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

                        {
                            historyList.map(item => (<Wrapper key={item.id} className="py-6 md:py-9 gap-10 relative" column={1} md={2}>
                                <Parallax speed={10}>
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                                        ~ {item.label}
                                    </h2>
                                </Parallax>

                                <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center max-w-6xl ml-auto">

                                    <div className="relative pt-6">
                                        <time dateTime={item.year} className="text-3xl md:text-5xl font-bold whitespace-nowrap">
                                            {item.year}
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
                                            {
                                                item.description.map((item, index) => (
                                                    <p key={index}>{item}</p>
                                                ))
                                            }
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
                                                alt="Команда IT 911 обсуждает разработку веб-сайтов и стратегии роста"
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.div>
                                    </Parallax>
                                </div>
                            </Wrapper>))
                        }
                    </div>
                </Container>
            </section>
        </ParallaxProvider>
    )
}