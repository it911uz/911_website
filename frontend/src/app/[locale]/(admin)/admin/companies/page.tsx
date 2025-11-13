import { searchParamsCache } from "@/lib/search-params.util";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CompaniesContent } from "./_components/companies-content";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/companies">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <CompaniesContent />
}

export default Page