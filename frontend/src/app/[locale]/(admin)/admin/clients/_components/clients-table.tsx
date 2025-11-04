import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "@/components/ui/table";

export const ClientsTable = () => {
    return (
        <section data-slot="clients" className="px-4 py-10 lg:px-8">
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableHeaderCell>
                            №
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Контактное лицо
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Наименование организации
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Телефон номер
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Электронная почта
                        </TableHeaderCell>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell>
                                1
                            </TableCell>

                            <TableCell>
                                Иванов Иван Иванович
                            </TableCell>

                            <TableCell>
                                ООО "Рога и копыта"
                            </TableCell>

                            <TableCell>
                                <a href="tel:+998774433335" className="hover:text-orange-600 block">+998 77 443-33-35</a>
                            </TableCell>

                            <TableCell>
                                <a href="mailto:2M4Kw@example.com" className="hover:text-orange-600 block">2M4Kw@example.com</a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableWrapper>
        </section>
    );
};