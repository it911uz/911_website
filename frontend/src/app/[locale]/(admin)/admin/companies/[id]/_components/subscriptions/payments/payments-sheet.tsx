"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useOpen } from "@/hooks/use-open";
import { toMoney } from "@/lib/utils";
import { PAYMENT_TYPES } from "@/schemas/company.schema";
import type { CompanyPayment } from "@/types/company.type";
import { CreditCard } from "lucide-react";

export const PaymentsSheet = ({ paymentsData }: Props) => {
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
            <SheetHeader>
                <SheetTitle>Платежи</SheetTitle>
            </SheetHeader>

            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>№</TableHeaderCell>
                            <TableHeaderCell>Сумма</TableHeaderCell>
                            <TableHeaderCell>Статус</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentsData.map((payment, index) => {
                            const status = PAYMENT_TYPES.find(type => type.value === payment.status);

                            return <TableRow key={payment.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>{toMoney(payment.amount)}</TableCell>

                                <TableCell>{status?.label}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableWrapper>
        </SheetContent>
    </Sheet>
}

interface Props {
    paymentsData: CompanyPayment[];
}