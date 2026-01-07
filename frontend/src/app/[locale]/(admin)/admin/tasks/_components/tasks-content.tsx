import { Columns, type ColumnType } from "./columns"
import { CreateColumn } from "./create-column"
import { CreateTask } from "./create-task"
import { auth } from "@/auth"
import { CreateTag } from "./create-tag"
import { getTasksStatuses } from "@/api/tasks/get-task-statuses.api"
import { getTasks } from "@/api/tasks/get-tasks.api"
import { searchParamsCache } from "@/lib/search-params.util"
import { TaskFilter } from "./task-filter"
import { PERMISSIONS } from "@/const/permissions.const"
import { PrivacyError } from "@/components/widgets/privacy-error"

export const TasksContent = async () => {
    const session = await auth();

    const { query, users, array } = searchParamsCache.all();

    const taskStatuses = await getTasksStatuses({
        token: session?.user.accessToken,
    });

    const tasks = await getTasks({
        token: session?.user.accessToken,
        query,
        status: array ? array : undefined,
        users: users ? users : undefined,
    });

    const columnsData: ColumnType[] = taskStatuses.data?.map((status) => {
        return {
            columnId: status.id,
            name: status.name,
            tasks: tasks.data.filter(task => task.status_id === status.id).map((task, index) => ({
                ...task,
                status: status.id,
                position: index + 1
            })),
            position: status.order,
            isCompleted: status.is_completed,
            hex: status.hex
        }
    }).sort((a, b) => a.position - b.position);

    const canCreateStatus = session?.user.permissions.includes(PERMISSIONS.create_task_statuses);
    const canCreateTasks = session?.user.permissions.includes(PERMISSIONS.create_tasks);
    const canCreateTags = session?.user.permissions.includes(PERMISSIONS.create_tags);
    const canSeeTasks = session?.user.permissions.includes(PERMISSIONS.view_tasks);

    if (taskStatuses.error?.response.status === 403 || tasks.error?.response.status === 403) {
        return <PrivacyError />
    }

    return (
        <>
            <section
                data-slot="tasks"
                className="px-4 py-10 lg:px-8"
            >
                <div className="flex flex-col gap-6 lg:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold">
                            Задачи
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Управляйте своими задачами, распределяйте, контролируйте и повышайте эффективность.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {
                            canCreateStatus && (
                                <CreateColumn />
                            )
                        }
                        {
                            canCreateTags && (
                                <CreateTag />
                            )
                        }
                        {
                            canCreateTasks && (
                                <CreateTask />
                            )
                        }
                    </div>
                </div>
            </section>

            {
                canSeeTasks && (
                    <>
                        <TaskFilter />

                        <Columns columnsData={columnsData} />
                    </>
                )
            }
        </>
    )
}
