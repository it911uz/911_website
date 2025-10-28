import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { About } from "./_components/about";
import { Clients } from "./_components/clients";
import { Cta } from "./_components/cta";
import { Header } from "./_components/header";
import { Services } from "./_components/services";
import { Why } from "./_components/why";
import { CallBack } from "./_components/callback";

const Page = async ({ params }: PageProps<"/[locale]">) => {
	const { locale } = await params;

	setRequestLocale(locale as Locale);

	return (
		<>
			<Header />

			<About />

			<Services />

			<Cta />

			<Why />

			<Clients />

			<CallBack />
		</>
	);
};

export default Page;
