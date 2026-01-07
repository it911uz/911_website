import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { searchParamsCache } from "@/lib/search-params.util";
import { TaskContent } from "./_components/task-content";
import { redirect } from "@/i18n/navigation";
import { Routers } from "@/configs/router.config";
import { auth } from "@/auth";
import { PERMISSIONS } from "@/const/permissions.const";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/admin/tasks/[id]">) => {
    const { locale, id } = await params;
    setRequestLocale(locale as Locale);
    await searchParamsCache.parse(searchParams);

    const session = await auth();

    const canSeeTask = session?.user.permissions.includes(PERMISSIONS.view_tasks);

    if (!id || !canSeeTask) {
        redirect({
            href: Routers.admin.tasks,
            locale: locale as Locale
        });
    }

    return <TaskContent taskId={Number(id)} />
}

export default Page;