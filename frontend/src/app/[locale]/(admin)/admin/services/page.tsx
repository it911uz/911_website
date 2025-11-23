import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { searchParamsCache } from "@/lib/search-params.util";
import { ServiceContent } from "./_components/service-content";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/services">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <ServiceContent />
}

export default Page;