import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { TargetContent } from "./_components/target-content";
import { searchParamsCache } from "@/lib/search-params.util";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/target">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <TargetContent />
}

export default Page;