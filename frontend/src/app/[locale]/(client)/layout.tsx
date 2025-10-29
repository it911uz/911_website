import { routing } from "@/i18n/routing";
import { Footer } from "@/layouts/footer";
import { Navigation } from "@/layouts/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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
