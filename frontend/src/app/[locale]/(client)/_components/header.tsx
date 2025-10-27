import { ArrowRight } from "lucide-react";
import { Container } from "@/components/widgets/container";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";

export const Header = () => {
	return (
		<section className="relative py-32 md:pt-32 md:pb-36 bg-linear-to-br from-[#003061] via-[#001a3d] to-[#000f24] text-white overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,79,2,0.2),transparent_70%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(250,79,2,0.15),transparent_70%)]" />
			<Container>
				<div className="relative flex flex-col lg:flex-row items-center gap-14 md:gap-20">
					<div className="flex-1 lg:max-w-[55%]">
						<h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight mb-8">
							Мы превращаем идеи в{" "}
							<span className="text-[#fa4f02]">цифровые решения</span>
						</h1>

						<p className="text-gray-300 text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
							Разрабатываем сайты, CRM-системы и телеграм-ботов, которые{" "}
							<strong className="text-white">атизируют ваш бизнес</strong> и
							увеличивают прибыль.
						</p>

						<div className="flex flex-col sm:flex-row gap-5 sm:gap-7">
							<Link
								href={Routers.contacts}
								className="inline-flex gap-3 items-center justify-center rounded-xl bg-[#fa4f02] px-9 py-4 text-base font-bold text-white shadow-lg shadow-[#fa4f02]/30 transition-all duration-300 hover:bg-[#e24700] hover:shadow-[#fa4f02]/40 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-[#fa4f02]/40"
							>
								<span>Оставить заявку</span>
								<ArrowRight className="h-5 w-5" />
							</Link>

							<Link
								href={Routers.home}
								className="inline-flex gap-3 items-center justify-center rounded-xl border border-gray-600 px-9 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#003061] hover:border-white focus:outline-none focus:ring-4 focus:ring-white/30 hover:scale-[1.03]"
							>
								<span>Узнать больше</span>
								<ArrowRight className="h-5 w-5" />
							</Link>
						</div>
					</div>

					<div className="w-full lg:max-w-[45%] relative">
						<div className="relative w-full aspect-4/3 rounded-3xl bg-linear-to-br from-[#002349] to-[#00142b] shadow-2xl flex items-center justify-center text-gray-400 text-lg font-semibold">
							Визуальный контент
						</div>
						<div className="absolute -top-5 -right-5 h-20 w-20 rounded-full bg-[#fa4f02]/20 animate-ping" />
						<div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#fa4f02]/10 blur-2xl" />
					</div>
				</div>
			</Container>
		</section>
	);
};
