import { setRequestLocale } from "next-intl/server";
import { FormContent } from "./_components/form-content";
import type { Locale } from "next-intl";

const Page = async ({ params }: PageProps<"/[locale]/auth/password">) => {
    const { locale } = await params;

    setRequestLocale(locale as Locale);
    return <>
        <FormContent />
    </>
}

export default Page;