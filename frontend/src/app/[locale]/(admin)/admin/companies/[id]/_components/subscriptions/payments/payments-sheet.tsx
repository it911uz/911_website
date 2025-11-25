"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ClientNoData } from "@/components/widgets/client-no-data";
import { useOpen } from "@/hooks/use-open";
import { toMoney } from "@/lib/utils";
import type { CompanyPayment } from "@/types/company.type";
import { CreditCard } from "lucide-react";
import { CreatePayments } from "./create-payments";
import { PAYMENT_VALUES } from "@/schemas/payments.schema";
import { DeletePayment } from "./delete-payment";
import { UpdatePayment } from "./edit-payment";

export const PaymentsSheet = ({ paymentsData, subscriptionId }: Props) => {
    const { open, onOpenChange } = useOpen();

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Tooltip>
            <TooltipTrigger>
                <CreditCard className="hover:text-red-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />
            </TooltipTrigger>
            <TooltipContent>
                Посмотреть платежи
            </TooltipContent>
        </Tooltip>
        <SheetContent className="w-4/5">
            <SheetHeader className="flex-row justify-between gap-5 pr-10">
                <SheetTitle>Платежи</SheetTitle>

                <CreatePayments subscriptionId={subscriptionId} />
            </SheetHeader>

            {
                paymentsData.length ? <TableWrapper>
                    <Table>
                        <TableHeader>
                            <TableHeaderCell>№</TableHeaderCell>
                            <TableHeaderCell>Сумма</TableHeaderCell>
                            <TableHeaderCell>Статус</TableHeaderCell>
                            <TableHeaderCell />
                        </TableHeader>
                        <TableBody>
                            {paymentsData.map((payment, index) => {
                                const status = PAYMENT_VALUES.find(type => type.value === payment.status);

                                return <TableRow key={payment.id}>
                                    <TableCell>{index + 1}</TableCell>

                                    <TableCell>{toMoney(payment.amount)} UZS</TableCell>

                                    <TableCell>{status?.label}</TableCell>

                                    <TableCell>
                                        <div className="flex justify-end gap-5">
                                            <UpdatePayment paymentData={payment} subscriptionId={subscriptionId} />

                                            <DeletePayment id={payment.id} subscriptionId={subscriptionId} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableWrapper> : <ClientNoData />
            }


        </SheetContent>
    </Sheet>
}

interface Props {
    paymentsData: CompanyPayment[];
    subscriptionId: number
}