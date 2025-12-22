import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { DashboardContent } from "./_components/dashboard-content";

const Page = async ({ params }: PageProps<"/[locale]/admin/dashboard">) => {

    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <DashboardContent />
}

export default Page;