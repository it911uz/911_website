import CrmSystemImage from "@public/images/crm-system.jpg";
import MobileAppImage from "@public/images/mobile-development.webp";
import TelegramBotImage from "@public/images/telegram-bots.webp";
import WebAutomationImage from "@public/images/web-automation.png";
import WebDevelopmentImage from "@public/images/web-development.jpg";

export const newsData = [
	{
		id: 1,
		name: {
			ru: "Запуск Telegram-ботов для автоматизации бизнеса",
			en: "Launch of Telegram Bots for Business Automation",
			uz: "Biznes jarayonlari uchun Telegram-botlar ishga tushirildi",
		},
		created_at: new Date("2025-12-03T11:00:00.000Z"),
		category: "telegram",
		image: TelegramBotImage,
		short_description: {
			ru: "IT 911 запустила разработку Telegram-ботов для приема заявок, уведомлений клиентов и автоматизации внутренних процессов компаний.",
			en: "IT 911 launched Telegram bot development for handling requests, customer notifications, and automating internal company processes.",
			uz: "IT 911 kompaniyalar uchun so‘rovlarni qabul qilish, xabarnomalar va ichki jarayonlarni avtomatlashtiruvchi Telegram-botlarni ishga tushirdi.",
		},
	},
	{
		id: 2,
		name: {
			ru: "Внедрение CRM-систем под бизнес-процессы клиентов",
			en: "CRM Systems Tailored to Client Business Processes",
			uz: "Mijozlar biznesiga mos CRM tizimlari joriy etildi",
		},
		created_at: new Date("2025-12-15T14:30:00.000Z"),
		category: "crm",
		image: CrmSystemImage,
		short_description: {
			ru: "Команда IT 911 внедрила CRM-системы с учётом специфики продаж, поддержки и аналитики для малого и среднего бизнеса.",
			en: "The IT 911 team implemented CRM systems tailored to sales, support, and analytics needs for small and medium-sized businesses.",
			uz: "IT 911 jamoasi kichik va o‘rta biznes uchun sotuv, qo‘llab-quvvatlash va tahlilga mos CRM tizimlarini joriy qildi.",
		},
	},
	{
		id: 3,
		name: {
			ru: "Автоматизация веб-сайтов и онлайн-сервисов",
			en: "Website and Online Service Automation",
			uz: "Veb-saytlar va onlayn xizmatlarni avtomatlashtirish",
		},
		created_at: new Date("2026-01-05T10:15:00.000Z"),
		category: "automation",
		image: WebAutomationImage,
		short_description: {
			ru: "IT 911 реализовала автоматизацию веб-сайтов: формы заявок, уведомления, интеграции с CRM и сторонними сервисами.",
			en: "IT 911 implemented website automation including request forms, notifications, CRM integrations, and third-party services.",
			uz: "IT 911 veb-saytlarda ariza shakllari, xabarnomalar va CRM integratsiyalarini avtomatlashtirdi.",
		},
	},
	{
		id: 4,
		name: {
			ru: "Разработка корпоративных веб-сайтов нового поколения",
			en: "Next-Generation Corporate Website Development",
			uz: "Yangi avlod korporativ veb-saytlari ishlab chiqildi",
		},
		created_at: new Date("2026-01-18T09:40:00.000Z"),
		category: "web",
		image: WebDevelopmentImage,
		short_description: {
			ru: "IT 911 представила современные веб-сайты с адаптивным дизайном, высокой скоростью загрузки и удобной административной панелью.",
			en: "IT 911 introduced modern websites with responsive design, high performance, and user-friendly admin panels.",
			uz: "IT 911 moslashuvchan dizayn, tezkor ishlash va qulay admin-panelga ega zamonaviy veb-saytlarni taqdim etdi.",
		},
	},
	{
		id: 5,
		name: {
			ru: "Старт мобильной разработки для бизнеса",
			en: "Launch of Mobile App Development for Businesses",
			uz: "Biznes uchun mobil ilovalar ishlab chiqish boshlandi",
		},
		created_at: new Date("2026-01-29T16:00:00.000Z"),
		category: "mobile",
		image: MobileAppImage,
		short_description: {
			ru: "IT 911 начала разработку мобильных приложений для управления заявками, клиентами и бизнес-процессами с iOS и Android.",
			en: "IT 911 started developing mobile applications for managing requests, clients, and business processes on iOS and Android.",
			uz: "IT 911 iOS va Android uchun arizalar, mijozlar va biznes jarayonlarini boshqaruvchi mobil ilovalarni ishlab chiqishni boshladi.",
		},
	},
] as const;
