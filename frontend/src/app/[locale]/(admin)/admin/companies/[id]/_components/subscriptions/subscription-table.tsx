import { getCompanySubscriptions } from "@/api/companies/get-company-subscriptions.api";
import { auth } from "@/auth";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "@/components/ui/table";
import { ClientNoData } from "@/components/widgets/client-no-data";
import { searchParamsCache } from "@/lib/search-params.util";
import { toMoney } from "@/lib/utils";
import { PAYMENT_TYPE_VALUES, PAYMENT_TYPES, type PaymentType } from "@/schemas/company.schema";
import dayjs from "dayjs";
import { EditSubscription } from "./edit-subscription";
import { DeleteSubscription } from "./delete-subscription";

export const SubscriptionTable = async ({ companyId }: Props) => {

    const { type, fromDate, toDate, targetId } = await searchParamsCache.all();

    const session = await auth();


    const { data } = await getCompanySubscriptions({
        token: session?.user.accessToken,
        companyId,
        paymentType: type ? type as PaymentType : undefined,
        fromDate,
        toDate,
        serviceId: targetId ? Number(targetId) : undefined
    });

    return (data.length ?
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHeaderCell>
                        №
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Услуга
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Тип подписки
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Дата начала
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Дата оповещения
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Дата окончания
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Стоимость услуги
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Стоимость
                    </TableHeaderCell>

                    <TableHeaderCell />
                </TableHeader>

                <TableBody>
                    {
                        data.map((subscription, index) => {
                            const paymentType = PAYMENT_TYPES.find(item => item.value === subscription.payment_type);
                            return <TableRow key={subscription.id}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>

                                <TableCell>
                                    {subscription.service.name}
                                </TableCell>

                                <TableCell>
                                    {paymentType?.label}
                                </TableCell>

                                <TableCell>
                                    {dayjs(subscription.start_date).format("DD.MM.YYYY")}
                                </TableCell>

                                <TableCell>
                                    {subscription.next_payment_due && dayjs(subscription.next_payment_due).format("DD.MM.YYYY")}
                                </TableCell>

                                <TableCell>
                                    {subscription.end_date && dayjs(subscription.end_date).format("DD.MM.YYYY")}
                                </TableCell>

                                <TableCell>
                                    {toMoney(subscription.service.price)} UZS
                                </TableCell>


                                <TableCell>
                                    {toMoney(subscription.price)} UZS
                                </TableCell>

                                <TableCell>
                                    <div className="flex gap-5 justify-end">
                                        <EditSubscription subscription={subscription} />

                                        <DeleteSubscription id={subscription.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableWrapper>
        : <ClientNoData />);
};

interface Props {
    companyId: number;
}