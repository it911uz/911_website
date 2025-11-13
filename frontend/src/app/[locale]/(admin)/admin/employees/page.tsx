import { searchParamsCache } from "@/lib/search-params.util";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { EmployeesContent } from "./_components/employees-content";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/employees">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <EmployeesContent />
}

export default Page;