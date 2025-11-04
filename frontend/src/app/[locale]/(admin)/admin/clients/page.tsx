import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ClientsContent } from "./_components/clients-content";

const Page = async ({ params }: PageProps<"/[locale]/admin/clients">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <ClientsContent />
}

export default Page