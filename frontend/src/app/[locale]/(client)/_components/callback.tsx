"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/widgets/container";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { callBackSchema, type CallBackSchemaType } from "@/schemas/home.schema";
import { ErrorMassage } from "@/components/widgets/error-message";
import { useTransition } from "react";
import { callbackAction } from "@/actions/callback.action";

export const CallBack = () => {
    const [pending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CallBackSchemaType>({
        resolver: zodResolver(callBackSchema),
    });

    const onSubmit = (data: CallBackSchemaType) => {
        startTransition(async () => {
            const response = await callbackAction({
                body: {
                    full_name: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    company_name: data.companyName,
                    company_info: data.companyInfo || "",
                },
            });

            if (!response.ok) {
                alert("❌ Что-то пошло не так, попробуйте ещё раз");
                return;
            }

            reset();
            alert("✅ Спасибо за заявку, мы свяжемся с вами в ближайшее время!");
        });
    };


    return (
        <section className="relative py-24 md:py-36 bg-linear-to-b from-[#fff5f0] to-white overflow-hidden">
            {/* декоративные фоны */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#fa4f02]/10 blur-3xl rounded-full -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#003061]/10 blur-3xl rounded-full -z-10" />

            <Container>
                {/* Заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#003061] mb-6">
                        Готовы начать проект?
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Оставьте заявку, и мы свяжемся с вами в течение часа, чтобы обсудить
                        все детали вашего будущего проекта.
                    </p>
                </motion.div>

                {/* Контент */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Форма */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white shadow-2xl border border-[#fa4f02]/10 rounded-3xl p-10 space-y-6 backdrop-blur-sm"
                    >
                        {/* Имя */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Имя
                            </label>
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#fa4f02] focus:ring-2 focus:ring-[#fa4f02]/20 outline-none transition-all"
                                {...register("fullName")}
                            />
                            <ErrorMassage error={errors.fullName?.message} />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Ваш email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#fa4f02] focus:ring-2 focus:ring-[#fa4f02]/20 outline-none transition-all"
                                {...register("email")}
                            />
                            <ErrorMassage error={errors.email?.message} />
                        </div>

                        {/* Телефон */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Телефон
                            </label>
                            <input
                                type="tel"
                                placeholder="+998 90 123 45 67"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#fa4f02] focus:ring-2 focus:ring-[#fa4f02]/20 outline-none transition-all"
                                {...register("phone")}
                            />
                            <ErrorMassage error={errors.phone?.message} />
                        </div>

                        {/* Телефон */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Название организации
                            </label>
                            <input
                                type="text"
                                placeholder="Название организации"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#fa4f02] focus:ring-2 focus:ring-[#fa4f02]/20 outline-none transition-all"
                                {...register("companyName")}
                            />
                            <ErrorMassage error={errors.phone?.message} />
                        </div>

                        {/* Комментарий */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Комментарий
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Опишите ваш проект..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#fa4f02] focus:ring-2 focus:ring-[#fa4f02]/20 outline-none transition-all resize-none"
                                {...register("companyInfo")}
                            ></textarea>
                            <ErrorMassage error={errors.companyInfo?.message} />
                        </div>

                        {/* Кнопка */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="cursor-pointer w-full bg-linear-to-r from-[#fa4f02] to-[#ff7032] text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300"
                        >
                            {
                                pending ? (
                                    "Отправка..."
                                ) : (
                                    "Отправить заявку"
                                )
                            }
                        </motion.button>
                    </motion.form>

                    {/* Контакты */}
                    <motion.ul
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <li className="flex items-center gap-5">
                            <div className="bg-[#fa4f02]/10 p-4 rounded-2xl">
                                <Phone className="text-[#fa4f02] w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Телефон</p>
                                <a
                                    href="tel:+998959553933"
                                    className="text-xl font-semibold text-[#003061] hover:text-[#fa4f02] transition-colors"
                                >
                                    +998 95 955 39 33
                                </a>
                            </div>
                        </li>

                        <li className="flex items-center gap-5">
                            <div className="bg-[#fa4f02]/10 p-4 rounded-2xl">
                                <Mail className="text-[#fa4f02] w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Email</p>
                                <a
                                    href="mailto:911.it@bk.ru"
                                    className="text-xl font-semibold text-[#003061] hover:text-[#fa4f02] transition-colors"
                                >
                                    911.it@bk.ru
                                </a>
                            </div>
                        </li>

                        <li className="flex items-center gap-5">
                            <div className="bg-[#fa4f02]/10 p-4 rounded-2xl">
                                <MapPin className="text-[#fa4f02] w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Адрес</p>
                                <p className="text-xl font-semibold text-[#003061]">
                                    г. Ташкент, ул. Chorsu MFY, 4 дом, 135 квартира
                                </p>
                            </div>
                        </li>

                        <li className="flex items-center gap-5">
                            <div className="bg-[#fa4f02]/10 p-4 rounded-2xl">
                                <Clock className="text-[#fa4f02] w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Часы работы</p>
                                <p className="text-xl font-semibold text-[#003061]">
                                    Пн–Пт: 09:00 – 18:00
                                </p>
                            </div>
                        </li>
                    </motion.ul>
                </div>
            </Container>
        </section>
    );
};
