import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ProfileContent } from "./_components/profile-content";

const Page = async ({ params }: PageProps<"/[locale]/admin/profile">) => {

    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <ProfileContent />

}

export default Page