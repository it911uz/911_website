import { ComingSoon } from "@/components/ui/coming-soon";
import { Routers } from "@/configs/router.config";
import { redirect } from "@/i18n/navigation";
import type { ParamsWithLocale } from "@/types/components.type";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

const Page = async ({ params }: PageProps<"/[locale]/about">) => {
    const { locale, id } = await params as ParamsWithLocale;

    setRequestLocale(locale);

    if (!id) {
        redirect({
            href: Routers.news,
            locale: locale as Locale
        });
    }

    return <ComingSoon />
}

export default Page;