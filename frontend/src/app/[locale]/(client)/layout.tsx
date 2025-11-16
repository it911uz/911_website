import { routing } from "@/i18n/routing";
import { Footer } from "@/layouts/footer";
import { Navigation } from "@/layouts/navigation";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
	title: {
		default: "Создание, Разработка и Интеграция Сайтов, CRM и Телеграм-ботов | IT 911 Solutions",
		template: "%s | IT 911",
	},
	description:
		"IT 911 — Профессиональное создание веб-сайтов под ключ, разработка CRM-систем и интеграция Телеграм-ботов. Мы создаем, разрабатываем и внедряем современные IT-решения для автоматизации и масштабирования вашего бизнеса в Узбекистане. Создание корпоративных сайтов, интернет-магазинов, систем управления.",
	keywords: [
		"создание сайтов", "разработка сайтов", "создать сайт", "создание веб-сайтов",
		"создать CRM", "разработка CRM-систем", "создание телеграм-ботов", "разработка ботов",
		"интеграция IT", "IT решения", "внедрение IT решений", "автоматизация бизнеса",
		"оптимизация бизнес-процессов", "веб-разработка", "frontend", "backend",
		"разработка мобильных приложений", "разработка приложений", "UX/UI дизайн",
		"интернет-магазины", "корпоративные сайты", "landing page", "сайт под ключ",
		"IT консалтинг", "автоматизация продаж", "автоматизация процессов", "системы учета",
		"управление проектами", "CRM для бизнеса", "Telegram bot разработка",
		"чат-боты", "боты для бизнеса", "IT услуги", "цифровая трансформация",
		"внедрение CRM", "IT поддержка", "сопровождение сайтов", "SEO оптимизация",
		"маркетинг автоматизация", "digital solutions", "business automation", "custom software",
		"web development", "website creation", "CRM development", "Telegram bot creation",
		"app development", "mobile app development", "UX/UI design", "corporate websites",
		"e-commerce development", "landing page design", "IT consulting", "project management",
		"system integration", "automation solutions", "Uzbekistan IT", "Tashkent IT",
		"sayt yaratish", "veb-sayt ishlab chiqish", "CRM tizimini yaratish", "CRM ishlab chiqish",
		"telegram bot yaratish", "botlar integratsiyasi", "yaratish", "ishlab chiqish",
		"avtomatlashtirish", "raqamli transformatsiya", "biznesni avtomatlashtirish",
		"vazifalarni boshqarish", "IT xizmatlar", "digital marketing", "onlayn-do‘konlar",
		"korporativ saytlar", "landing sahifa", "mobil ilovalar yaratish"
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-snippet": -1,
			"max-image-preview": "large",
			"max-video-preview": -1
		}
	},
	authors: [{ name: "IT 911 Solutions", url: "https://it911.uz/" }],
	openGraph: {
		title: "Создание сайтов, CRM и Телеграм-ботов | IT 911 Solutions",
		description:
			"Мы создаём веб-сайты, CRM-системы и телеграм-ботов для автоматизации и роста вашего бизнеса в Узбекистане.",
		url: "https://it911.uz/",
		siteName: "IT 911 Solutions",
		type: "website",
		images: [
			{
				url: "https://it911.uz/favicon/apple-touch-icon.png",
				width: 1200,
				height: 630,
				alt: "IT 911 Solutions — Веб-сайты, CRM и боты"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "Создание сайтов, CRM и Телеграм-ботов | IT 911 Solutions",
		description:
			"IT 911 Solutions — профессиональная разработка веб-сайтов, CRM и телеграм-ботов под ключ в Узбекистане.",
		images: ["https://it911.uz/favicon/apple-touch-icon.png"],
		site: "@it911_uz",
		creator: "@it911_uz"
	},
	icons: {
		icon: "/favicon/favicon.ico",
		shortcut: "/favicon/favicon-96x96.png",
		apple: "/favicon/apple-touch-icon.png"
	},
	alternates: {
		canonical: "https://it911.uz",
		languages: {
			"ru-RU": "https://it911.uz/ru",
			"uz-UZ": "https://it911.uz/uz",
			"en-US": "https://it911.uz/en",
		},
	},
};


const ClientLayout = async ({ params, children }: LayoutProps<"/[locale]">) => {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<>
			<GoogleTagManager gtmId="GTM-NSH2LDJT" />

			<Script id="facebook-pixel" strategy="afterInteractive">
				{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
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

			<Script id="yandex-metrika" strategy="afterInteractive">
				{`(function(m,e,t,r,i,k,a){
					m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();
					for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
					k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
					})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105323764', 'ym');
					ym(105323764, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
				`}
			</Script>

			<noscript>
				<iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-NSH2LDJT"
					height="0"
					width="0"
					style={{ display: "none", visibility: "hidden" }}
				/>

				<img
					height="1"
					width="1"
					style={{ display: "none" }}
					src="https://www.facebook.com/tr?id=1150212770641880&ev=PageView&noscript=1"
					alt=""
				/>

				<div>
					<img
						src="https://mc.yandex.ru/watch/105323764"
						style={{ position: "absolute", left: "-9999px" }}
						alt=""
					/>
				</div>
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
