import { Columns, type ColumnType } from "./columns"
import { CreateColumn } from "./create-column"
import { CreateTask } from "./create-task"
import { auth } from "@/auth"
import { CreateTag } from "./create-tag"
import { getTasksStatuses } from "@/api/tasks/get-task-statuses.api"

export const TasksContent = async () => {
    const session = await auth();

    const taskStatuses = await getTasksStatuses({
        token: session?.user.accessToken,
    });

    const columnsData: ColumnType[] = taskStatuses.data?.map((status, index) => {
        return {
            columnId: status.id,
            name: status.name,
            leads: [],
            position: index + 1
        }
    })

    return (
        <>
            <section
                data-slot="leads"
                className="px-4 py-10 lg:px-8 "
            >
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-3xl font-bold ">
                            Задачи
                        </h2>
                        <p className="text-gray-01 mt-1">
                            Управляйте своими задачами, конвертируйте и отслеживайте эффективность.
                        </p>
                    </div>

                    <div className="space-x-5">
                        <CreateColumn />

                        <CreateTag />

                        <CreateTask />
                    </div>
                </div>
            </section>

            <Columns columnsData={columnsData} />
        </>
    )
}
