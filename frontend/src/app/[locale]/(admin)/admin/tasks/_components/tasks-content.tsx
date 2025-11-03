import { Columns } from "./columns"
import { CreateColumn } from "./create-column"
import { CreateTask } from "./create-task"

export const TasksContent = () => {
    return (
        <>
            <section
                data-slot="leads"
                className="px-4 py-10 lg:px-8 bg-linear-to-b from-background to-muted/30"
            >
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Задачи
                        </h2>
                        <p className="text-gray-01 mt-1">
                            Управляйте своими задачами, конвертируйте и отслеживайте эффективность.
                        </p>
                    </div>

                    <div className="space-x-5">
                        <CreateColumn />

                        <CreateTask />
                    </div>
                </div>
            </section>

            <Columns />
        </>
    )
}
