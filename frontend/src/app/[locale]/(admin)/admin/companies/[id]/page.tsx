import { Routers } from "@/configs/router.config";
import { redirect } from "@/i18n/navigation";
import { searchParamsCache } from "@/lib/search-params.util";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CompanyContent } from "./_components/company-content";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/companies/[id]">) => {
    const { locale, id } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    if(!id) {
        redirect({
            href: Routers.admin.companies,
            locale: locale as Locale
        });
    }

    return <CompanyContent companyId={Number(id)} />
}

export default Page