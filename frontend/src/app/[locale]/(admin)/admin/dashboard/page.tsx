import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

const Page = async ({ params }: PageProps<"/[locale]/admin/dashboard">) => {

    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}

export default Page;