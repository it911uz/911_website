"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { PenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import type { User } from "@/types/user.type";
import { editUser } from "@/api/users/edit-user.api";
import { SelectRole } from "./select-role";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { type EmploySchemaType, employSchema } from "@/schemas/employ.schema";

export const EditEmploy = ({ user }: Props) => {
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
        defaultValues: {
            full_name: user.full_name ?? "",
            username: user.username ?? "",
            email: user.email ?? "",
            role_id: user.role_id ?? 0,
            phone_number: user.phone_number ?? "",
        },
    });

    const onSubmit = (values: EmploySchemaType) => {
        startTransition(async () => {
            const response = await editUser({
                id: user.id,
                body: values,
                token: session.data?.user.accessToken,
            });

            if (!response.ok) {
                toastErrorResponse(response.data);
                return;
            }

            toast.success("Сотрудник изменен");
            router.refresh();
            reset();
            onOpenChange(false);
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <PenLine className="cursor-pointer" onClick={() => onOpenChange(true)} />

            <SheetContent className="w-2/5">
                <SheetHeader>
                    <SheetTitle>Редактирование сотрудника</SheetTitle>
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
                        <FieldError errors={[errors.full_name]} />
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
                        <FieldError errors={[errors.username]} />
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
                        <FieldError errors={[errors.email]} />
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
                        <FieldError errors={[errors.phone_number]} />
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
                        <FieldError errors={[errors.password]} />
                    </Field>

                    <Button loading={pending} type="submit" size="lg" variant="black">
                        Создать
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};

interface Props {
    user: User;
}
