import { searchParamsCache } from "@/lib/search-params.util";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { RolesContent } from "./_components/roles-content";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/roles">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <RolesContent />
}

export default Page;