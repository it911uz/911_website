import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { DashboardContent } from "./_components/dashboard-content";
import { searchParamsCache } from "@/lib/search-params.util";
import { auth } from "@/auth";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/dashboard">) => {

    const { locale } = await params;
    await searchParamsCache.parse(searchParams);
    setRequestLocale(locale as Locale);
    const session = await auth();

    return session?.user.isSuperuser && <DashboardContent />;
}

export default Page;