import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { TasksContent } from "./_components/tasks-content";

const Page = async ({ params }: PageProps<"/[locale]/admin/tasks">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);

    return <TasksContent />
}

export default Page;