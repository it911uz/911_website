"use client";

import { type Locale, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/util";

const LANGUAGES = [
	{ code: "ru", display: "🇷🇺 RU", next: "uz" },
	{ code: "uz", display: "🇺🇿 UZ", next: "en" },
	{ code: "en", display: "🇬🇧 EN", next: "ru" },
];

export const SwitchLang = () => {
	const pathname = usePathname();
	const currentLocale = useLocale();

	const currentLang = LANGUAGES.find((l) => l.code === currentLocale);
	const nextLang = LANGUAGES.find((l) => l.code === currentLang?.next);

	return (
		<Link
			href={pathname}
			locale={nextLang?.code as Locale}
			className={cn(
				"py-1.5 px-4 text-sm font-semibold uppercase tracking-wide rounded-full",
				"bg-[#003061]/5 text-[#003061] hover:bg-[#fa4f02]/5 hover:text-[#fa4f02]",
				"transition-all duration-300 shadow-inner hover:shadow-lg",
				"focus:outline-none focus:ring-2 focus:ring-[#fa4f02]/40",
			)}
		>
			{nextLang?.display}
		</Link>
	);
};
