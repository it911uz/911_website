"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { serviceSchema, type ServiceSchemaType } from "@/schemas/service.schema";
import { CustomSunEditor } from "@/components/ui/editor";
import { createService } from "@/api/services/create-service.api";
import { toastErrorResponse } from "@/lib/toast-error-response.util";

export const CreateService = () => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm<ServiceSchemaType>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            is_subscription: false,
        }
    });

    const session = useSession();

    const onSubmit = (values: ServiceSchemaType) => {
        startTransition(async () => {

            const response = await createService({
                body: values,
                token: session.data?.user.accessToken
            });

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Услуга создана");
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
            >
                <Plus />
                <span>Создать</span>
            </Button>

            <SheetContent className="w-2/5">
                <SheetHeader>
                    <SheetTitle>Создание услуги</SheetTitle>
                </SheetHeader>

                <form className="space-y-5 mt-5" onSubmit={handleSubmit(onSubmit)}>

                    <Field>
                        <FieldLabel required>Название</FieldLabel>
                        <Input color="light" {...register("name")} />
                        <ErrorMassage error={errors.name?.message} />
                    </Field>

                    <Field >
                        <FieldLabel required>Цена (сум)</FieldLabel>
                        <Input
                            type="number"
                            color="light"
                            {...register("price", {
                                valueAsNumber: true,
                            })}
                        />
                        <ErrorMassage error={errors.price?.message} />
                    </Field>

                    <Field >
                        <FieldLabel>Подписка</FieldLabel>

                        <div>
                            <Input color="light" type="checkbox"  {...register("is_subscription")} />
                        </div>
                    </Field>

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel required>
                                    Описание услуги
                                </FieldLabel>

                                <CustomSunEditor
                                    defaultValue={field.value}
                                    onChange={field.onChange}
                                />

                                <ErrorMassage error={errors.description?.message} />
                            </Field>
                        )}
                    />

                    <Button
                        loading={pending}
                        type="submit"
                        size="lg"
                        variant="black"
                    >
                        Создать
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};
