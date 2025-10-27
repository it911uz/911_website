"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/widgets/container";

const reviews = [
	{
		id: 1,
		name: "Александра Иванова",
		position: "Маркетолог, ООО «Ромашка»",
		image: "https://randomuser.me/api/portraits/women/68.jpg",
		text: "Команда IT911 помогла нам полностью обновить корпоративный сайт и связать его с CRM. Теперь клиенты получают ответы быстрее, а продажи выросли на 30%.",
	},
	{
		id: 2,
		name: "Илья Кузнецов",
		position: "Директор, ЗАО «ТехноПлюс»",
		image: "https://randomuser.me/api/portraits/men/14.jpg",
		text: "Разработали Telegram-бота, который автоматизировал приём заказов. Простота, скорость и качество — всё на высшем уровне. Спасибо за надёжное решение!",
	},
	{
		id: 3,
		name: "Наталья Орлова",
		position: "Основатель, ИП «Смарт-Решения»",
		image: "https://randomuser.me/api/portraits/women/14.jpg",
		text: "Благодаря внедрению CRM от IT911 удалось оптимизировать работу отдела продаж. Теперь мы точно знаем, на каком этапе каждый клиент и что нужно улучшить.",
	},
	{
		id: 4,
		name: "Михаил Петров",
		position: "Руководитель проектов, «DigitalPro»",
		image: "https://randomuser.me/api/portraits/men/22.jpg",
		text: "IT911 — настоящие профессионалы. Сделали сайт быстрее срока, адаптировали под мобильные устройства и помогли с SEO. Отличный результат!",
	},
	{
		id: 5,
		name: "Екатерина Смирнова",
		position: "Менеджер по развитию, «NovaMedia»",
		image: "https://randomuser.me/api/portraits/women/26.jpg",
		text: "Работа с IT911 — одно удовольствие. Команда всегда на связи, предлагает свежие идеи и реализует всё чётко. Наш бот теперь принимает более 200 заказов в день!",
	},
];

export const Clients = () => {
	return (
		<section className="py-24 md:py-32 bg-linear-to-b from-[#fff5f0] to-white relative overflow-hidden">
			<div className="absolute top-0 left-0 w-96 h-96 bg-[#fa4f02]/10 blur-3xl rounded-full -z-10" />
			<div className="absolute bottom-0 right-0 w-80 h-80 bg-[#003061]/10 blur-3xl rounded-full -z-10" />

			<Container>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-extrabold text-[#003061] mb-4">
						Что говорят наши клиенты
					</h2>
					<p className="text-lg text-gray-700">
						Более <span className="font-bold text-[#fa4f02]">150+</span>{" "}
						успешных проектов и довольные клиенты — наша лучшая реклама.
					</p>
				</motion.div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
					{reviews.map((r, i) => (
						<motion.div
							key={r.id}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: i * 0.15 }}
							className="bg-white rounded-3xl shadow-lg p-8 border border-[#fa4f02]/10 flex flex-col items-center text-center"
						>
							{/** biome-ignore lint/performance/noImgElement: <explanation> */}
							<img
								width={96}
								height={96}
								src={r.image}
								alt={r.name}
								className="w-24 h-24 rounded-full object-cover mb-6 shadow-md"
							/>
							<p className="text-gray-700 mb-6 leading-relaxed">“{r.text}”</p>
							<div>
								<h4 className="text-xl font-semibold text-[#003061]">
									{r.name}
								</h4>
								<p className="text-gray-500 text-sm">{r.position}</p>
							</div>
						</motion.div>
					))}
				</div>
			</Container>
		</section>
	);
};
