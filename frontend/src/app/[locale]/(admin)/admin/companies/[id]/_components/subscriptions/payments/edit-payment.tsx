"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { PAYMENT_VALUES, paymentsSchema, type PaymentsType } from "@/schemas/payments.schema";
import type { CompanyPayment } from "@/types/company.type";
import { updateCompanyPayment } from "@/api/companies/update-company-payment.api";

export const UpdatePayment = ({ subscriptionId, paymentData }: Props) => {
    const { open, onOpenChange } = useOpen();
    const session = useSession();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<PaymentsType>({
        resolver: zodResolver(paymentsSchema),
        defaultValues: {
            amount: Number(paymentData.amount),
            status: paymentData.status,
        },
    });


    const onSubmit = (values: PaymentsType) => {
        startTransition(async () => {
            const response = await updateCompanyPayment({
                token: session?.data?.user?.accessToken,
                body: values,
                id: paymentData.id,
                companyId: Number(id),
                subscriptionId
            })

            if (response.error) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Платеж обновлен");
            router.refresh();
            onOpenChange(false);
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <PenLine className="hover:text-blue-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />

            <SheetContent className="w-2/5">
                <SheetHeader>
                    <SheetTitle>Редактировать платеж</SheetTitle>
                </SheetHeader>

                <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>

                    <Field>
                        <FieldLabel className="text-lg" required>
                            Цена
                        </FieldLabel>
                        <Input
                            type="number"
                            sizes="lg"
                            color="light"
                            placeholder="Введите сумму"
                            {...register("amount", { valueAsNumber: true })}
                        />
                        <ErrorMassage error={errors.amount?.message} />
                    </Field>

                    <Controller name="status" control={control} render={({ field }) => <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value} value={field.value}>
                        <SelectTrigger className="w-full" size="lg">
                            <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>

                        <SelectContent>
                            {PAYMENT_VALUES.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>} />

                    <Button loading={pending} variant="black" size="lg" type="submit">
                        Сохранить
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};

interface Props {
    subscriptionId: number;
    paymentData: CompanyPayment;
}
