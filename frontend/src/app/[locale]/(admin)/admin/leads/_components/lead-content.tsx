import { getLeadStatuses } from "@/api/leads/get-lead-statuses.api"
import { Columns, type ColumnType } from "./columns"
import { CreateColumn } from "./create-column"
import { CreateLead } from "./create-lead"
import { auth } from "@/auth"
import { getLeads } from "@/api/leads/get-leads.api"
import { searchParamsCache } from "@/lib/search-params.util"

export const LeadContent = async () => {
    const session = await auth();
    const { perPage, page, array } = searchParamsCache.all();

    const leadStatuses = await getLeadStatuses(session?.user.accessToken);

    const leads = await getLeads({
        token: session?.user.accessToken,
        statusIds: array ? array.map((id) => id) : undefined,
    });

    const columnsData: ColumnType[] = leadStatuses.data.items?.map(status => {
        return {
            columnId: status.id,
            hex: status.hex,
            name: status.name,
            position: status.level,
            leads: leads.data.items.filter(lead => lead.status.id === status.id).map(lead => ({
                id: lead.id,
                full_name: lead.full_name,
                company_name: lead.company_name,
                company_info: lead.company_info,
                phone: lead.phone,
                email: lead.email,
                status: lead.status_id,
            }))
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
                            Лиды
                        </h2>
                        <p className="text-gray-01 mt-1">
                            Управляйте своими лидами, конвертируйте и отслеживайте эффективность.
                        </p>
                    </div>

                    <div className="space-x-5">
                        <CreateColumn />

                        <CreateLead />
                    </div>
                </div>
            </section>

            <Columns columnsData={columnsData} />
        </>
    )
}
