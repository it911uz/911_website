import { getServices } from "@/api/services/get-services.api"
import { auth } from "@/auth";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "@/components/ui/table"
import { toMoney } from "@/lib/utils";
import { Plus } from "lucide-react";
import { EditService } from "./edit-service";
import { DeleteService } from "./delete-service";

export const ServicesTable = async () => {
    const session = await auth();

    const { data } = await getServices(session?.user.accessToken);

    return <section data-slot="table" className="px-4 py-10 lg:px-8">
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHeaderCell>
                        №
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Наименование
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Стоимость
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Подписка
                    </TableHeaderCell>

                    <TableHeaderCell />
                </TableHeader>

                <TableBody>
                    {
                        data.map((service, index) => (
                            <TableRow key={service.id}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>

                                <TableCell>
                                    {service.name}
                                </TableCell>

                                <TableCell>
                                    {toMoney(service.price)} UZS
                                </TableCell>

                                <TableCell>
                                    {service.is_subscription ? <Plus /> : null}
                                </TableCell>

                                <TableCell>
                                    <div className="flex gap-5 justify-end">
                                        <EditService service={service} />
                                        <DeleteService serviceId={service.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </TableWrapper>
    </section>
}