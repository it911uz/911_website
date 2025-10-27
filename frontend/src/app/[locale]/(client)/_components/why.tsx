"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle, Rocket, Shield, Sparkles } from "lucide-react";
import { Container } from "@/components/widgets/container";

const reasons = [
	{
		id: 1,
		icon: Rocket,
		title: "Современные технологии",
		desc: "Мы используем актуальные фреймворки и инструменты, чтобы ваши проекты были быстрыми, безопасными и долговечными.",
	},
	{
		id: 2,
		icon: Shield,
		title: "Надёжность и качество",
		desc: "Каждый проект проходит этап тестирования, чтобы вы получали только стабильный и предсказуемый результат.",
	},
	{
		id: 3,
		icon: Sparkles,
		title: "Индивидуальный подход",
		desc: "Мы разрабатываем решения под конкретные цели вашего бизнеса, а не шаблонные продукты.",
	},
	{
		id: 4,
		icon: CheckCircle,
		title: "Полный цикл разработки",
		desc: "От идеи и дизайна до поддержки и продвижения — всё в одном месте, без посредников.",
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

export const Why = () => {
	return (
		<section className="relative py-24 md:py-36 bg-linear-to-b from-[#fff5f0] to-white overflow-hidden">
			<div className="absolute top-0 left-0 w-120 h-120 bg-[#fa4f02]/10 blur-3xl rounded-full -z-10" />
			<div className="absolute bottom-0 right-0 w-lg h-128 bg-[#003061]/10 blur-3xl rounded-full -z-10" />

			<Container>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-extrabold text-[#003061] mb-6">
						Почему выбирают <span className="text-[#fa4f02]">именно нас?</span>
					</h2>
					<p className="text-lg text-gray-700 leading-relaxed">
						IT911 — это не просто разработка. Мы помогаем бизнесу внедрять
						эффективные технологии, которые действительно работают на результат.
					</p>
				</motion.div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
					{reasons.map((reason, i) => {
						const Icon = reason.icon;
						return (
							<motion.div
								key={reason.id}
								variants={cardVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.3 }}
								custom={i}
								className="group bg-white rounded-3xl p-8 shadow-lg border border-[#fa4f02]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#fa4f02]/30"
							>
								<div className="flex justify-center mb-6">
									<Icon className="h-12 w-12 text-[#fa4f02] transition-transform duration-300 group-hover:scale-110" />
								</div>
								<h3 className="text-xl font-bold text-[#003061] mb-3 text-center">
									{reason.title}
								</h3>
								<p className="text-gray-700 text-center leading-relaxed">
									{reason.desc}
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
