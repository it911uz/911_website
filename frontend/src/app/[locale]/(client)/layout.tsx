import { routing } from "@/i18n/routing";
import { Footer } from "@/layouts/footer";
import { Navigation } from "@/layouts/navigation";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
	],

	robots: {
		follow: true,
		index: true,
		googleBot: {
			follow: true,
			index: true,
			'max-snippet': -1,
			'max-image-preview': 'large',
		},
	}
};


const ClientLayout = async ({ params, children }: LayoutProps<"/[locale]">) => {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<>
			<Script id="facebook-pixel" strategy="afterInteractive">
				{`
					!function(f,b,e,v,n,t,s)
					{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t,s)}(window, document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
					fbq('init', '1150212770641880');
					fbq('track', 'PageView');
				`}
			</Script>

			<noscript>
				<img
					height="1"
					width="1"
					style={{ display: "none" }}
					src="https://www.facebook.com/tr?id=1150212770641880&ev=PageView&noscript=1"
					alt=""
				/>
			</noscript>
			<NuqsAdapter>
				<Navigation className="shrink-0" />

				<main className="flex-1">{children}</main>

				<Footer />
			</NuqsAdapter>
		</>

	);
};

export default ClientLayout;