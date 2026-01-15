import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { About } from "./_components/about";
import { Clients } from "./_components/clients";
import { Footer } from "./_components/footer";
import { News } from "./_components/news";
import { Statistics } from "./_components/statistics";
import { Success } from "./_components/success";
import { Today } from "./_components/today";

const Page = async ({ params }: PageProps<"/[locale]">) => {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	return (
		<>
			<News />

			<About />

			<Clients />

			<Success />

			<Statistics />

			<Today />

			<Footer />
		</>
	);
};

export default Page;
