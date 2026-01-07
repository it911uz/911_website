import { auth } from "@/auth";
import { Table, TableBody, TableHeader, TableHeaderCell, TableWrapper } from "@/components/ui/table";
import { searchParamsCache } from "@/lib/search-params.util";
import { getUsers } from "@/api/users/get-users.api";
import { EmployeesTableRow } from "./employees-table-row";
import { EmployeesPagination } from "./employees-pagination";
import { ClientNoData } from "@/components/widgets/client-no-data";
import { PrivacyError } from "@/components/widgets/privacy-error";

export const EmployeesTable = async () => {
    const { page, query, perPage, userRole } = await searchParamsCache.all();

    const session = await auth();

    const { data, error } = await getUsers({
        page: page,
        perPage: perPage,
        token: session?.user.accessToken,
        query,
        roleId: userRole,
    });

    if (error?.response.status === 403) {
        return <PrivacyError />
    }

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
                                Имя
                            </TableHeaderCell>

                            <TableHeaderCell>
                                Должность
                            </TableHeaderCell>

                            <TableHeaderCell>
                                Почта
                            </TableHeaderCell>

                            <TableHeaderCell>
                                Телефон
                            </TableHeaderCell>

                            <TableHeaderCell />
                        </TableHeader>

                        <TableBody>
                            {
                                data?.items?.map((item, index) => <EmployeesTableRow
                                    key={item.id}
                                    user={item}
                                    index={index + 1}
                                />)
                            }
                        </TableBody>
                    </Table>
                </TableWrapper>

                <EmployeesPagination totalPages={data.pages} />
            </> : <ClientNoData />
        }

    </section>
};