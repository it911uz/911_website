import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { searchParamsCache } from "@/lib/search-params.util";
import { TaskContent } from "./_components/task-content";
import { redirect } from "@/i18n/navigation";
import { Routers } from "@/configs/router.config";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/tasks/[id]">) => {
    const { locale, id } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    if (!id) {
        redirect({
            href: Routers.admin.tasks,
            locale: locale as Locale
        });
    }

    return <TaskContent taskId={Number(id)} />
}

export default Page;