import { ComingSoon } from "@/components/ui/coming-soon"
import { searchParamsCache } from "@/lib/search-params.util";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/employees">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <ComingSoon />
}

export default Page;