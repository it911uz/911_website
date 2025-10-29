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
