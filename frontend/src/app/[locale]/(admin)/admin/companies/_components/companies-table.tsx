import { Table, TableBody, TableHeader, TableHeaderCell, TableWrapper } from "@/components/ui/table";
import { CompaniesPagination } from "./companies-pagination";
import { getCompanies } from "@/api/companies/get-companies.api";
import { auth } from "@/auth";
import { searchParamsCache } from "@/lib/search-params.util";
import { CompaniesTableRow } from "./companies-table-row";
import { ClientNoData } from "@/components/widgets/client-no-data";

export const CompaniesTable = async () => {

    const session = await auth();
    const { page, query, perPage, status } = await searchParamsCache.all();
    const { data } = await getCompanies({
        token: session?.user.accessToken,
        page: page,
        perPage: perPage,
        query,
        status
    });

    return <section
        data-slot="table"
        className="px-4 py-10 lg:px-8 "
    >
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

                            <TableHeaderCell>
                                Телефон номер
                            </TableHeaderCell>

                            <TableHeaderCell>
                                Статус
                            </TableHeaderCell>

                            <TableHeaderCell />
                        </TableHeader>

                        <TableBody>
                            {
                                data.items.map((company, index) => (
                                    <CompaniesTableRow key={company.id} company={company} index={index + 1} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableWrapper>

                <CompaniesPagination totalPages={data.pages} />
            </> : <ClientNoData />
        }

    </section>
};