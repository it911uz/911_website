"use client";

import { Wrapper } from "@/components/ui/wrapper";
import { Container } from "@/components/widgets/container";
import { motion, type Variants } from "framer-motion";

const headerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
    },
};

const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 10,
        },
    },
};

export const Success = () => {
    return (
        <section data-slot="success" className="py-12 md:py-24 bg-white overflow-x-hidden">
            <Container>
                <Wrapper className="gap-6" column={1} md={2} >
                    <motion.h2
                        variants={headerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-gray-600 text-2xl md:text-3xl font-bold tracking-wide"
                    >
                        ~ Залог успеха
                    </motion.h2>

                    <motion.div
                        variants={textContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="space-y-6 md:space-y-8"
                    >
                        <motion.p variants={paragraphVariants} className="text-3xl md:text-5xl font-semibold text-gray-800 leading-tight">
                            IT 911 — ваш надежный партнер в мире цифровых решений. Мы предлагаем полный спектр услуг: от передовых digital-технологий и анализа данных до надежной связи.
                        </motion.p>

                        <motion.p variants={paragraphVariants} className="text-xl md:text-3xl text-gray-500 leading-relaxed">
                            Опыт в организации рабочих процессов, накопленный за 5 лет, стал основой для успешного развития бизнеса наших клиентов. Наша команда профессионалов готова поделиться этим опытом, создавая вместе с вами современное и эффективное решение.
                        </motion.p>
                    </motion.div>
                </Wrapper>
            </Container>
        </section>
    );
};