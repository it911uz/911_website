"use client";

import { motion, type Variants } from "framer-motion";
import { Bot, Code2, Database, Layout } from "lucide-react";
import { Container } from "@/components/widgets/container";

const services = [
	{
		id: 1,
		icon: Layout,
		title: "Создание сайтов",
		desc: "Разрабатываем современные, адаптивные и быстрые сайты — от лендингов до корпоративных порталов, которые эффективно представляют ваш бизнес в сети.",
	},
	{
		id: 2,
		icon: Database,
		title: "CRM-системы",
		desc: "Внедряем и адаптируем CRM под задачи компании. Помогаем оптимизировать продажи, автоматизировать процессы и улучшить работу команды.",
	},
	{
		id: 3,
		icon: Bot,
		title: "Telegram-боты",
		desc: "Создаём умных ботов для бизнеса, которые принимают заказы, консультируют клиентов и интегрируются с вашими системами.",
	},
	{
		id: 4,
		icon: Code2,
		title: "IT-консалтинг и автоматизация",
		desc: "Анализируем процессы и предлагаем решения, которые ускоряют работу, сокращают расходы и делают бизнес более технологичным.",
	},
];

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.15,
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1],
		},
	}),
};

export const Services = () => {
	return (
		<section className="relative py-24 md:py-36 bg-linear-to-b from-white to-[#fff5f0] overflow-hidden">
			<div className="absolute -top-20 right-0 w-lg h-128 bg-[#fa4f02]/10 blur-3xl rounded-full -z-10" />
			<div className="absolute bottom-0 left-0 w-xl h-144 bg-[#003061]/10 blur-3xl rounded-full -z-10" />

			<Container>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center max-w-4xl mx-auto mb-20"
				>
					<h2 className="text-4xl md:text-5xl font-extrabold text-[#003061] mb-6">
						Наши <span className="text-[#fa4f02]">услуги</span>
					</h2>
					<p className="text-lg text-gray-700 leading-relaxed">
						Мы создаём цифровые решения, которые помогают бизнесу расти,
						улучшать сервисы и выходить на новый уровень. Каждая услуга — это
						шаг к вашему успеху.
					</p>
				</motion.div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
					{services.map((service, i) => {
						const Icon = service.icon;
						return (
							<motion.div
								key={service.id}
								variants={cardVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.3 }}
								custom={i}
								className="group relative bg-white rounded-3xl shadow-lg p-8 border border-[#fa4f02]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#fa4f02]/30 overflow-hidden"
							>
								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-[#fa4f02]/10 to-transparent rounded-3xl" />

								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
									className="relative z-10 mb-6 flex justify-center"
								>
									<Icon className="h-12 w-12 text-[#fa4f02] transition-transform duration-300 group-hover:scale-110" />
								</motion.div>

								<h3 className="text-xl font-bold text-[#003061] mb-3 text-center relative z-10">
									{service.title}
								</h3>

								<p className="text-gray-700 text-center leading-relaxed relative z-10">
									{service.desc}
								</p>

								<div className="mt-6 h-[3px] w-0 bg-[#fa4f02] rounded-full transition-all duration-300 group-hover:w-full mx-auto" />
							</motion.div>
						);
					})}
				</div>
			</Container>
		</section>
	);
};
