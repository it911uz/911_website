import { setRequestLocale } from "next-intl/server";
import { News } from "./_components/news";
import type { Locale } from "next-intl";
import { About } from "./_components/about";
import { Clients } from "./_components/clients";
import { Success } from "./_components/success";
import { Statistics } from "./_components/statistics";
import { Today } from "./_components/today";
import { Footer } from "./_components/footer";

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
