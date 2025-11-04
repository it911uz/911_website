import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { LeadContent } from "./_components/lead-content";

const Page = async ({ params }: PageProps<"/[locale]/admin/leads">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <LeadContent />
}

export default Page;