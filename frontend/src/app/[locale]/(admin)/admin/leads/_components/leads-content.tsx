import { Columns } from "./columns"
import { CreateLead } from "./create-lead"
import { LeadsTable } from "./leads-table"

export const LeadsContent = () => {
    return (
        <>
            <section
                data-slot="leads"
                className="px-4 py-10 lg:px-8 bg-linear-to-b from-background to-muted/30"
            >
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Лиды
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Управляйте своими лидами, конвертируйте и отслеживайте эффективность.
                        </p>
                    </div>

                    <CreateLead />
                </div>
            </section>

            <Columns />
        </>
    )
}
