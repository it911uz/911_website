"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import {
    companySubscriptionSchema,
    PAYMENT_TYPES,
    type CompanySubscriptionSchemaType,
} from "@/schemas/company.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectService } from "./select-service";
import dayjs from "dayjs";
import type { Service } from "@/types/service.type";
import type { CompanySubscription } from "@/types/company.type";
import { updateCompanySubscription } from "@/api/companies/update-company-subscription.api";
import { toastErrorResponse } from "@/lib/toast-error-response.util";

export const EditSubscription = ({ subscription }: Props) => {
    const { open, onOpenChange } = useOpen();
    const session = useSession();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [selectedService, setSelectedService] = useState<Service | null>(subscription.service);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,

    } = useForm<CompanySubscriptionSchemaType>({
        resolver: zodResolver(companySubscriptionSchema),
        defaultValues: {
            end_date: subscription.end_date ? dayjs(subscription.end_date).format("YYYY-MM-DD") : undefined,
            next_payment_due: subscription.next_payment_due ? dayjs(subscription.next_payment_due).format("YYYY-MM-DD") : undefined,
            payment_type: subscription.payment_type,
            price: subscription.price,
            service_id: subscription.service_id,
            start_date: dayjs(subscription.start_date).format("YYYY-MM-DD"),
        }
    });

    const watchPaymentType = watch("payment_type");

    const countNextPaymentDue = () => {
        if (watchPaymentType === "monthly") {
            return dayjs().add(1, "month").format("YYYY-MM-DD");
        }
        if (watchPaymentType === "annually") {
            return dayjs().add(1, "year").format("YYYY-MM-DD");
        }
        return undefined;
    };

    const onSubmit = (values: CompanySubscriptionSchemaType) => {
        startTransition(async () => {

            console.log("values", values);

            const response = await updateCompanySubscription({
                token: session?.data?.user?.accessToken,
                data: {
                    ...values,
                    payment_type: selectedService?.is_subscription ? values.payment_type : "one_time",
                    next_payment_due: countNextPaymentDue(),
                },
                companyId: Number(id),
                id: subscription.id
            });

            if (response.error) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Подписка обновлена");
            router.refresh();
            reset();
            onOpenChange(false);
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <PenLine className="hover:text-red-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />

            <SheetContent className="w-2/5">
                <SheetHeader>
                    <SheetTitle>Редактировать подписку</SheetTitle>
                </SheetHeader>

                <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        control={control}
                        name="service_id"
                        render={({ field }) => (
                            <Field>
                                <FieldLabel className="text-lg" required>
                                    Услуга
                                </FieldLabel>
                                <SelectService
                                    onValueChange={(value) => {
                                        field.onChange(value.id);
                                        setSelectedService(value);
                                    }}
                                    value={field.value?.toString()}
                                />
                                <ErrorMassage error={errors.service_id?.message} />
                            </Field>
                        )}
                    />

                    {
                        selectedService?.is_subscription && <Controller
                            control={control}
                            name="payment_type"
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel className="text-lg" required>
                                        Тип оплаты
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger size={"lg"}>
                                            <SelectValue placeholder="Выберите тип оплаты" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PAYMENT_TYPES.map((paymentType) => (
                                                <SelectItem key={paymentType.value} value={paymentType.value}>
                                                    {paymentType.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <ErrorMassage error={errors.payment_type?.message} />
                                </Field>
                            )}
                        />
                    }

                    <Field>
                        <FieldLabel className="text-lg" required>
                            Цена
                        </FieldLabel>
                        <Input
                            type="number"
                            sizes="lg"
                            color="light"
                            placeholder="Введите сумму"
                            {...register("price", { valueAsNumber: true })}
                        />
                        <ErrorMassage error={errors.price?.message} />
                    </Field>

                    <Field>
                        <FieldLabel className="text-lg" required>
                            Дата начала
                        </FieldLabel>
                        <Input
                            type="date"
                            sizes="lg"
                            color="light"
                            {...register("start_date")}
                        />
                        <ErrorMassage error={errors.start_date?.message} />
                    </Field>

                    {selectedService?.is_subscription && ["monthly", "annually"].includes(watchPaymentType || "") && (
                        <Field>
                            <FieldLabel className="text-lg">
                                Дата окончания (опционально)
                            </FieldLabel>
                            <Input
                                type="date"
                                sizes="lg"
                                color="light"
                                {...register("end_date")}
                            />
                            <ErrorMassage error={errors.end_date?.message} />
                        </Field>
                    )}

                    <Button loading={pending} variant="black" size="lg" type="submit">
                        Сохранить
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};

interface Props {
    subscription: CompanySubscription
}
