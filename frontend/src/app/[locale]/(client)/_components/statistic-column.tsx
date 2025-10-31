"use client";

import { motion, type Variants } from "framer-motion";

const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export const StatColumn = ({ value, unit, description, height, delay = 0 }: Props) => {

    return (
        <motion.li
            style={{ height: height }}
            className="border-l border-b border-gray-200 flex flex-col justify-between px-4 md:px-10 pb-5 pt-16 md:pt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >

            <div className="flex-1 relative! pb-10 md:pb-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: delay }}
                    className="font-black text-5xl md:text-8xl text-gray-900 sticky top-16 lg:top-20 left-0 right-0 z-10 bg-white pl-4 md:pl-5 pt-5"
                >
                    <span>{value}</span>
                    <sup className="text-red-600/90 ml-1">{unit}</sup>
                </motion.div>
            </div>

            <motion.p
                variants={textVariants}
                transition={{ delay: 0.5 + delay }}
                className="text-gray-700 relative z-10 text-lg md:text-2xl mt-4"
            >
                {description}
            </motion.p>
        </motion.li>
    );
};

interface Props {
    value: number;
    unit: string;
    description: string;
    height: string;
    delay?: number;
}
