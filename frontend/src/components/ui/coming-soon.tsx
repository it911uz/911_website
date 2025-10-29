"use client";

import { motion, type Variants } from "framer-motion";
import { Wrench, Rocket, Clock } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

export const ComingSoon = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-8">
            <motion.div
                className="text-center bg-white border border-gray-200 rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <Wrench className="w-16 h-16 md:w-20 md:h-20 text-red-600 mx-auto animate-pulse" />
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
                >
                    Страница в разработке!
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-gray-600"
                >
                    Мы усердно работаем над этим разделом, чтобы предложить вам что-то по-настоящему особенное.
                </motion.p>

                <motion.div variants={itemVariants} className="flex justify-center items-center gap-6 pt-4">
                    <div className="flex items-center text-gray-500">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="font-medium text-sm md:text-base">Скоро вернемся</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <Rocket className="w-5 h-5 mr-2" />
                        <span className="font-medium text-sm md:text-base">Будет потрясающе!</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};