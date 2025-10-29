import { ComingSoon } from "@/components/ui/coming-soon";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

const Page = async ({ params }: PageProps<"/[locale]/about">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <ComingSoon />
}

export default Page;