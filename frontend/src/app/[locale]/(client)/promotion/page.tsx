import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Header } from "./_components/header";
import { SectionPromo } from "./_components/content";

const Page = async ({ params }: PageProps<"/[locale]/promotion">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <>
        <Header />

        <SectionPromo />
    </>
}

export default Page;