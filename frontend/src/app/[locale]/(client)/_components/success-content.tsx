"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

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

export const SuccessContent = () => {
    const t = useTranslations("HomePage.Success.description");

    return (
        <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6 md:space-y-8"
        >
            <motion.p variants={paragraphVariants} className="text-3xl md:text-5xl font-semibold text-gray-800 leading-tight">
                {t("1")}
            </motion.p>

            <motion.p variants={paragraphVariants} className="text-xl md:text-3xl text-gray-500 leading-relaxed">
                {t("2")}
            </motion.p>
        </motion.div>
    );
};