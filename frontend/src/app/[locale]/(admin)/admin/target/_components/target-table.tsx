import { getTarget } from "@/api/target/get-target.api"
import { Table, TableBody, TableHeader, TableHeaderCell, TableWrapper } from "@/components/ui/table"
import { searchParamsCache } from "@/lib/search-params.util";
import { TargetTableRow } from "./target-table-row";
import { auth } from "@/auth";
import { ClientNoData } from "@/components/widgets/client-no-data";
import { TargetPagination } from "./target-pagination";

export const TargetTable = async () => {
    const { perPage, page, isActive, query } = searchParamsCache.all();

    const session = await auth();

    const { data } = await getTarget({
        page: page,
        perPage: perPage,
        isActive: isActive,
        token: session?.user.accessToken,
        query
    });

    return data.items.length ? <section data-slot="targets" className="px-4 py-10 lg:px-8 ">
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHeaderCell>
                        №
                    </TableHeaderCell>

                    <TableHeaderCell>
                        UUID
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Название
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Клиентов
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Активность
                    </TableHeaderCell>

                    <TableHeaderCell />
                </TableHeader>

                <TableBody>
                    {
                        data.items.map((ite, index) => (
                            <TargetTableRow key={ite.id} leadsCount={ite.leads_count} name={ite.name} isActive={ite.is_active} index={index + 1} id={ite.id} />
                        ))
                    }
                </TableBody>
            </Table>
        </TableWrapper>

        <TargetPagination totalPages={data.pages} />
    </section> : <ClientNoData />
}