"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { employSchema, type EmploySchemaType } from "@/schemas/employ.schema";
import { SelectRole } from "./select-role";
import { createUser } from "@/api/users/create-user.api";
import { toastErrorResponse } from "@/lib/toast-error-response.util";

export const CreateEmploy = () => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const session = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<EmploySchemaType>({
        resolver: zodResolver(employSchema),
    });

    const onSubmit = (values: EmploySchemaType) => {
        startTransition(async () => {
            const response = await createUser({
                body: values,
                token: session.data?.user.accessToken,
            });

            if (!response.ok) {
                toastErrorResponse(response.data);
                return;
            }

            toast.success("Сотрудник создан");
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
                    <SheetTitle>Создание сотрудника</SheetTitle>
                </SheetHeader>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Field>
                        <FieldLabel className="text-lg" required>
                            ФИО
                        </FieldLabel>
                        <Input
                            color="light"
                            type="text"
                            sizes="lg"
                            placeholder="Введите ФИО"
                            {...register("full_name")}
                        />
                        <ErrorMassage error={errors.full_name?.message} />
                    </Field>

                    <Field>
                        <FieldLabel className="text-lg" required>
                            Имя пользователя
                        </FieldLabel>
                        <Input
                            color="light"
                            type="text"
                            sizes="lg"
                            placeholder="Введите имя пользователя"
                            {...register("username")}
                        />
                        <ErrorMassage error={errors.username?.message} />
                    </Field>

                    <Field>
                        <FieldLabel className="text-lg" required>
                            Почта
                        </FieldLabel>
                        <Input
                            color="light"
                            type="email"
                            sizes="lg"
                            placeholder="Введите почту"
                            {...register("email")}
                        />
                        <ErrorMassage error={errors.email?.message} />
                    </Field>

                    <SelectRole control={control} />

                    <Field>
                        <FieldLabel className="text-lg" required>
                            Телефон
                        </FieldLabel>
                        <Input
                            color="light"
                            type="text"
                            sizes="lg"
                            placeholder="+998901234567"
                            {...register("phone_number")}
                        />
                        <ErrorMassage error={errors.phone_number?.message} />
                    </Field>

                    <Field>
                        <FieldLabel className="text-lg" required>
                            Пароль
                        </FieldLabel>
                        <Input
                            color="light"
                            type="password"
                            sizes="lg"
                            placeholder="Введите пароль"
                            {...register("password")}
                        />
                        <ErrorMassage error={errors.password?.message} />
                    </Field>

                    <Button loading={pending} type="submit" size="lg" variant="black">
                        Создать
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};
