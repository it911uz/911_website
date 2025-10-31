"use client";

import { LinkButton } from "@/components/ui/link-button";
import { Routers } from "@/configs/router.config";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
    const t = useTranslations("HomePage.About");

    return (
        <motion.div
            className="w-full text-2xl md:text-4xl font-bold space-y-4 md:space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.p variants={itemVariants}>
                {
                    t("description.1")
                }
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-600/80 text-xl md:text-3xl">
                {
                    t("description.2")
                }
            </motion.p>

            <motion.div variants={itemVariants} className="pt-8 md:pt-16">
                <LinkButton className="font-bold" rounded={true} size={"lg"} variant={"black"} href={Routers.about}>
                    <span>
                        {
                            t("link")
                        }
                    </span>
                    <MoveRight />
                </LinkButton>
            </motion.div>
        </motion.div>
    );
};