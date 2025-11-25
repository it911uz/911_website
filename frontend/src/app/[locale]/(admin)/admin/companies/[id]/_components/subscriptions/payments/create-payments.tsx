"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { PAYMENT_VALUES, paymentsSchema, type PaymentsType } from "@/schemas/payments.schema";
import { createCompanyPayment } from "@/api/companies/create-company-payment.api";

export const CreatePayments = ({ subscriptionId }: Props) => {
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
    });


    const onSubmit = (values: PaymentsType) => {
        startTransition(async () => {
            const response = await createCompanyPayment({
                companyId: Number(id),
                token: session?.data?.user?.accessToken,
                body: values,
                subscriptionId,
            });

            if (response.error) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Платеж создана");
            router.refresh();
            reset();
            onOpenChange(false);
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <Button
                className="text-lg"
                onClick={() => onOpenChange(true)}
                size="md"
                variant="black"
                title="Добавить платеж"
            >
                <CreditCard />
            </Button>

            <SheetContent className="w-2/5">
                <SheetHeader>
                    <SheetTitle>Добавить платеж</SheetTitle>
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
    subscriptionId: number
}
