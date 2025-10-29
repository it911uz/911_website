"use client";

import { LinkButton } from "@/components/ui/link-button";
import { Wrapper } from "@/components/ui/wrapper";
import { Container } from "@/components/widgets/container";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const botsItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            stiffness: 70,
            damping: 10,
        },
    },
};

export const Bots = () => {
    return (
        <section id="bot" data-slot="bot" className="py-24 bg-black text-white">
            <Container>
                <Wrapper className="gap-6" column={1} lg={3} >

                    <div />

                    <motion.div
                        variants={botsItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="space-y-6 col-span-3 md:col-span-2 xl:col-span-1 order-1 lg:order-0"
                    >
                        <p className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4">
                            Боты и мессенджеры
                        </p>

                        <p className="text-xl md:text-2xl font-semibold text-gray-50">
                            Автоматизация через Telegram и другие платформы
                        </p>

                        <p className="text-lg text-gray-400 max-w-lg">
                            Разрабатываем умных ботов для поддержки клиентов, приема заказов и интеграции с внутренними системами.
                        </p>

                        <div className="pt-8 text-right">
                            <LinkButton
                                href={Routers.home}
                                rounded
                                variant="white"
                                size="lg"
                            >
                                <span>
                                    О проекте
                                </span>
                                <ArrowRight className="w-5 h-5 ml-1" />
                            </LinkButton>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-end lg:items-end w-full col-span-3 lg:col-span-1 lg:hidden xl:flex"
                    >
                        <div className="text-lg font-medium text-gray-400 space-x-4 mb-4">
                            <Link href={Routers.home + "#system"} >~ CRM</Link>
                            <Link href={Routers.home + "#site"} >~ Сайты</Link>
                            <Link href={Routers.home + "#bot"} className="text-white font-bold">~ Боты</Link>
                        </div>
                    </motion.div>
                </Wrapper>
            </Container>
        </section>
    );
};