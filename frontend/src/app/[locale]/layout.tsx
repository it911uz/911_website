import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { rubik } from "@/configs/font.config";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export const generateStaticParams = () => {
	return routing.locales.map((locale) => ({ locale }));
};

export const metadata: Metadata = {
	title: "IT 911",
	description: "IT 911",
};

const RootLayout = async ({ params, children }: LayoutProps<"/[locale]">) => {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<html lang={locale} translate="no" className={cn("scroll-smooth")}>
			<head>
				<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
				<link rel="shortcut icon" href="/favicon/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-title" content="IT 911" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
			</head>
			<body className="min-h-screen flex flex-col justify-between">
				<NextIntlClientProvider>
					{children}

					<Toaster />
				</NextIntlClientProvider>
			</body>
		</html>
	);
};

export default RootLayout;
