import { routing } from "@/i18n/routing";
import { Footer } from "@/layouts/footer";
import { Navigation } from "@/layouts/navigation";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: {
		default: "Создание, Разработка и Интеграция Сайтов, CRM и Телеграм-ботов | IT 911 Solutions",
		template: "%s | IT 911",
	},

	description: "IT 911 — Профессиональное создание веб-сайтов под ключ, разработка CRM-систем и интеграция Телеграм-ботов. Мы создаем, разрабатываем и внедряем современные IT-решения для автоматизации и масштабирования вашего бизнеса в Узбекистане. Создание корпоративных сайтов, интернет-магазинов, систем управления.",

	keywords: [
		"создание сайтов", "разработка сайтов", "создать сайт", "создание веб-сайтов", "создать CRM", "разработка CRM-систем", "создание телеграм-ботов", "разработка ботов", "интеграция", "IT-решения", "внедрение", "автоматизация бизнеса",

		"sayt yaratish", "veb-sayt ishlab chiqish", "CRM tizimini yaratish", "CRM ishlab chiqish", "telegram bot yaratish", "botlar integratsiyasi", "yaratish", "ishlab chiqish", "avtomatlashtirish", "O'zbekiston IT",

		"website creation", "web development", "create CRM system", "CRM development", "telegram bot creation", "bot integration", "IT solutions", "custom development", "business automation", "Uzbekistan IT",
	]
};


const ClientLayout = async ({ params, children }: LayoutProps<"/[locale]">) => {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<>
			<Navigation className="shrink-0" />

			<main className="flex-1">{children}</main>

			<Footer />
		</>
	);
};

export default ClientLayout;