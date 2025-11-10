import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { TargetContent } from "./_components/target-content";

const Page = async ({ params }: PageProps<"/[locale]/admin/target">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <TargetContent />
}

export default Page;