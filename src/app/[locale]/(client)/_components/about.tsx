"use client";

import { motion } from "framer-motion";
import { Briefcase, Clock, Users } from "lucide-react";
import { Container } from "@/components/widgets/container";
import { LogoText } from "@/components/widgets/logo-text";

export const About = () => {
	const c = [
		{
			icon: Briefcase,
			value: "150+",
			label: "выполненных проектов",
		},
		{
			icon: Users,
			value: "50+",
			label: "довольных клиентов",
		},
		{
			icon: Clock,
			value: "5+",
			label: "лет опыта",
		},
	];

	return (
		<section className="relative py-24 md:py-36 bg-linear-to-b from-white to-[#fff5f0] overflow-hidden">
			<Container>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="max-w-5xl mx-auto text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-extrabold text-[#003061] mb-6">
						О компании <LogoText />
					</h2>
					<p className="text-lg md:text-xl text-gray-700 leading-relaxed">
						<LogoText /> — команда специалистов, создающих цифровые решения для
						бизнеса. Мы разрабатываем сайты, CRM-системы и Telegram-ботов,
						помогая компаниям автоматизировать процессы, увеличивать продажи и
						укреплять связь с клиентами.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-16 items-start">
					<motion.div
						initial={{ opacity: 0, x: -60 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="space-y-6"
					>
						<h3 className="text-2xl font-bold text-[#003061]">Наша миссия</h3>
						<p className="text-gray-700 leading-relaxed text-lg">
							Мы стремимся сделать технологии доступными и полезными каждому
							бизнесу. Наши решения помогают компаниям расти, экономить время и
							ресурсы, а также повышать эффективность и прозрачность процессов.
						</p>
						<p className="text-gray-700 leading-relaxed text-lg">
							Главная цель — чтобы каждый клиент получил измеримый результат и
							мог сосредоточиться на развитии своего дела, пока цифровые
							инструменты работают на него.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 60 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="relative bg-white shadow-xl rounded-3xl p-10 border border-[#fa4f02]/10 overflow-hidden"
					>
						<div className="absolute inset-0 bg-linear-to-br from-[#fa4f02]/5 to-transparent rounded-3xl pointer-events-none" />

						<h3 className="text-2xl font-bold text-[#003061] mb-10 relative z-10">
							Наши достижения
						</h3>

						<div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-center relative z-10">
							{c.map((item, i) => {
								const Icon = item.icon;
								return (
									<motion.div
										key={item.value}
										initial={{ opacity: 0, y: 40 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.6,
											delay: i * 0.15,
										}}
										className="group transition-transform duration-300 hover:-translate-y-1"
									>
										<div className="flex justify-center mb-3">
											<Icon className="w-10 h-10 text-[#fa4f02] group-hover:scale-110 transition-transform duration-300" />
										</div>
										<h4 className="text-4xl font-extrabold text-[#fa4f02]">
											{item.value}
										</h4>
										<p className="text-gray-700 font-medium mt-2">
											{item.label}
										</p>
									</motion.div>
								);
							})}
						</div>
					</motion.div>
				</div>
			</Container>

			<div className="absolute -top-10 -right-20 w-96 h-96 bg-[#fa4f02]/10 blur-3xl rounded-full -z-10" />
			<div className="absolute bottom-0 left-0 w-lg h-128 bg-[#003061]/5 blur-3xl rounded-full -z-10" />
		</section>
	);
};
