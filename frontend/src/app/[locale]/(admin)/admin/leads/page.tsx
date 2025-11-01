import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { LeadsContent } from "./_components/leads-content";

const Page = async ({ params }: PageProps<"/[locale]/admin/leads">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return (
        <>
            <LeadsContent />
        </>
    )
}

export default Page;