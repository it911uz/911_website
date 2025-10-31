"use client";

import { LinkButton } from "@/components/ui/link-button";
import { Wrapper } from "@/components/ui/wrapper";
import { Container } from "@/components/widgets/container";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

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
    const t = useTranslations("HomePage.Effect");

    return (
        <section id="bot" data-slot="bot" className="py-24 bg-black text-white overflow-x-hidden">
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
                        <h3 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4">
                            {t("Bots.title")}
                        </h3>

                        <p className="text-xl md:text-2xl font-semibold text-gray-50">
                            {t("Bots.subtitle")}
                        </p>

                        <p className="text-lg text-gray-400 max-w-lg">
                            {t("Bots.description")}
                        </p>

                        <div className="pt-8 text-right">
                            <LinkButton
                                href={Routers.home}
                                rounded
                                variant="white"
                                size="lg"
                            >
                                <span>
                                    {t("link")}
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
                            <Link href={Routers.home + "#system"} >
                                {t("anchor.1")}
                            </Link>
                            <Link href={Routers.home + "#site"} >
                                {t("anchor.2")}
                            </Link>
                            <Link href={Routers.home + "#bot"} className="text-white font-bold">
                                {t("anchor.3")}
                            </Link>
                        </div>
                    </motion.div>
                </Wrapper>
            </Container>
        </section>
    );
};