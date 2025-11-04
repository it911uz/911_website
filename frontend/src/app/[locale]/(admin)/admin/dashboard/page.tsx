import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Cards } from "./_components/cards";
import { Charts } from "./_components/charts";

const Page = async ({ params }: PageProps<"/[locale]/admin/dashboard">) => {

    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return (
        <>
            <Cards />

            <Charts />
        </>
    )
}

export default Page;