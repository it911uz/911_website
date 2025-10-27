"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/widgets/container";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";

export const Cta = () => {
	return (
		<section className="relative py-28 bg-linear-to-br from-[#003061] to-[#001a36] overflow-hidden text-white">
			<div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#fa4f02]/20 blur-3xl rounded-full -z-10" />
			<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fa4f02]/10 blur-3xl rounded-full -z-10" />

			<Container>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center max-w-3xl mx-auto"
				>
					<h2 className="text-4xl md:text-5xl font-extrabold mb-6">
						Готовы начать проект?
					</h2>

					<p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
						Давайте вместе создадим решение, которое поможет вашему бизнесу
						расти и достигать новых целей. Наша команда готова воплотить ваши
						идеи в реальность.
					</p>

					<Link
						href={Routers.contacts}
						className="inline-block px-10 py-4 rounded-full bg-[#fa4f02] text-white font-semibold text-lg shadow-lg hover:bg-[#e64600] hover:shadow-xl transition-all duration-300"
					>
						Обсудить проект
					</Link>
				</motion.div>
			</Container>

			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				whileInView={{ opacity: 0.2, scale: 1 }}
				transition={{ duration: 1.2, ease: "easeOut" }}
				className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,79,2,0.2)_0%,transparent_70%)] pointer-events-none"
			/>
		</section>
	);
};
