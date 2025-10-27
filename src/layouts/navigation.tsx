"use client";

import LogoSvg from "@public/logo.svg";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { ComponentProps } from "react";
import { Container } from "@/components/widgets/container";
import { Routers } from "@/configs/router.config";
import { navigation } from "@/const/navigation.const";
import { Link, usePathname } from "@/i18n/navigation";
import { cn, isActiveGroupPath } from "@/lib/util";
import { SwitchLang } from "./_components/switch-lang";

export const Navigation = ({ className, ...props }: ComponentProps<"nav">) => {
	const pathname = usePathname();
	const locale = useLocale();

	return (
		<nav
			className={cn(
				"bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100",
				className,
			)}
			{...props}
		>
			<Container>
				<div className="py-3 flex items-center justify-between">
					<Link className="inline-block shrink-0" href={Routers.home}>
						<Image
							priority
							src={LogoSvg}
							alt="Лого IT911"
							width={120}
							height={40}
							className="transition-transform duration-300 hover:scale-[1.03]"
						/>
					</Link>

					<div className="flex items-center gap-6">
						<ul className="hidden md:flex gap-1 items-center">
							{navigation.map((item) => (
								<li key={item.id}>
									<Link
										href={item.path}
										className={cn(
											"px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
											"text-gray-700 hover:text-[#fa4f02] hover:bg-[#fa4f02]/5",
											{
												"text-[#fa4f02] bg-[#fa4f02]/10 shadow-sm":
													isActiveGroupPath(pathname, item.path),
											},
										)}
									>
										{item.name[locale]}
									</Link>
								</li>
							))}
						</ul>

						<div className="hidden md:block h-6 w-px bg-gray-200" />

						<SwitchLang />
					</div>
				</div>
			</Container>
		</nav>
	);
};
