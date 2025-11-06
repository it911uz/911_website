import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { LeadContent } from "./_components/lead-content";
import { searchParamsCache } from "@/lib/search-params.util";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/leads">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <LeadContent />
}

export default Page;