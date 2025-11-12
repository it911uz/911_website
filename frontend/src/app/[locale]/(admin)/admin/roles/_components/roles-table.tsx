import { getRoles } from "@/api/roles/get-roles.api";
import { auth } from "@/auth";
import { Table, TableBody, TableHeader, TableHeaderCell, TableWrapper } from "@/components/ui/table";
import { searchParamsCache } from "@/lib/search-params.util";
import { RolesTableRow } from "./roles-table-row";
import { RolesPagination } from "./roles-pagination";
import { ServerNoData } from "@/components/widgets/server-no-data";

export const RolesTable = async () => {
    const { page, query, perPage } = await searchParamsCache.all();

    const session = await auth();

    const { data } = await getRoles({
        page: page,
        perPage: perPage,
        token: session?.user.accessToken,
        query
    })

    return <section data-slot="roles" className="px-4 py-10 lg:px-8 ">

        {
            data.items.length ? <>
                <TableWrapper>
                    <Table>
                        <TableHeader>
                            <TableHeaderCell>
                                №
                            </TableHeaderCell>

                            <TableHeaderCell>
                                Название
                            </TableHeaderCell>

                            <TableHeaderCell />
                        </TableHeader>

                        <TableBody>
                            {
                                data.items.map((item, index) => <RolesTableRow
                                    key={item.id}
                                    role={item}
                                    index={index + 1}
                                />)
                            }
                        </TableBody>
                    </Table>
                </TableWrapper>

                <RolesPagination totalPages={data.pages} />
            </> : <ServerNoData />
        }

    </section>
};