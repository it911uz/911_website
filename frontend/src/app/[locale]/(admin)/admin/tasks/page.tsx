import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { TasksContent } from "./_components/tasks-content";
import { searchParamsCache } from "@/lib/search-params.util";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/tasks">) => {
    const { locale } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    return <TasksContent />
}

export default Page;