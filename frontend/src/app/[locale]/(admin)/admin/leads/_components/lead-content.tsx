import { getLeadStatuses } from "@/api/leads/get-lead-statuses.api"
import { Columns, type ColumnType } from "./columns"
import { CreateColumn } from "./create-column"
import { CreateLead } from "./create-lead"
import { auth } from "@/auth"
import { getLeads } from "@/api/leads/get-leads.api"
import { searchParamsCache } from "@/lib/search-params.util";
import { PERMISSIONS } from "@/const/permissions.const"

export const LeadContent = async () => {
    const session = await auth();

    const { array } = searchParamsCache.all();

    const leadStatuses = await getLeadStatuses({
        token: session?.user.accessToken,
    });

    const leads = await getLeads({
        token: session?.user.accessToken,
        statusIds: array ? array : undefined,
    });

    const columnsData: ColumnType[] = leadStatuses.data?.map((status) => {
        return {
            columnId: status.id,
            name: status.name,
            leads: leads.data.filter(lead => lead.status_id === status.id).map((lead, index) => ({
                ...lead,
                status: status.id,
                position: index + 1,
            })).sort((a, b) => a.position - b.position),
            position: status.level,
            canEdit: status.can_edit,
            hex: status.hex,
        }
    }).sort((a, b) => a.position - b.position);

    const canCreateColumn = session?.user.role.permissions.some(permission => permission.codename === PERMISSIONS.createLeadStatuses);
    const canCreateLead = session?.user.role.permissions.some(permission => permission.codename === PERMISSIONS.createLeads);

    return (
        <>
            <section
                data-slot="leads"
                className="px-4 py-10 lg:px-8"
            >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Лиды
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Управляйте своими лидами, конвертируйте и отслеживайте эффективность.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                        {
                            canCreateColumn &&
                            <CreateColumn />
                        }

                        {
                            canCreateLead &&
                            <CreateLead />
                        }
                    </div>
                </div>
            </section>

            <Columns columnsData={columnsData} />
        </>
    )
}
