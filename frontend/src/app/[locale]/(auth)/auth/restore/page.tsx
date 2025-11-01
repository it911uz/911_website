import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { FormContent } from "./_components/form-content";

const Page = async ({ params }: PageProps<"/[locale]/auth/restore">) => {

    const { locale } = await params;

    setRequestLocale(locale as Locale);

    return (
        <>
            <FormContent />
        </>
    )
}

export default Page;