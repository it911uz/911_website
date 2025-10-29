"use client";

import { LinkButton } from "@/components/ui/link-button";
import { Routers } from "@/configs/router.config";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        staggerChildren: 0.2,
    },
};
export const AboutContent = () => {
    return (
        <motion.div
            className="w-full text-2xl md:text-4xl font-bold space-y-4 md:space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.p variants={itemVariants}>
                Мы специализируемся на создании веб-сайтов, разработке CRM-систем и телеграм-ботов, которые помогают бизнесу автоматизировать процессы и увеличивать прибыль.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-600/80 text-xl md:text-3xl">
                Мы помогаем бизнесу расти через современные цифровые технологии. Каждое решение создаём с фокусом на результат - увеличение продаж, автоматизацию процессов и повышение эффективности работы.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-8 md:pt-16">
                <LinkButton className="font-bold" rounded={true} size={"lg"} variant={"black"} href={Routers.about}>
                    <span>
                        О Компании
                    </span>
                    <MoveRight />
                </LinkButton>
            </motion.div>
        </motion.div>
    );
};