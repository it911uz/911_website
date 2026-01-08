"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { KeyRound, Lock } from "lucide-react";
import { toast } from "sonner";
import { type ChangePasswordType, changePasswordSchema } from "@/schemas/change-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { changePassword } from "@/api/auth/change-password.api";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export const ChangePasswordForm = () => {
    const [pending, startTransition] = useTransition();
    const { data } = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ChangePasswordType>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = (values: ChangePasswordType) => {
        startTransition(async () => {
            const response = await changePassword({
                token: data?.user.accessToken as string,
                body: values
            });

            if (!response.ok) {
                toastErrorResponse(response.data);
                return;
            }

            toast.success("Пароль успешно изменён");
            reset();
        });
    };

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700">
                    <KeyRound className="size-6" />
                    <span>Смена пароля</span>
                </CardTitle>
                <CardDescription>
                    Используйте надёжный пароль, который вы не применяете на других сайтах.
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field>
                        <FieldLabel htmlFor="old_password">Текущий пароль</FieldLabel>
                        <div className="relative">
                            <Input
                                id="old_password"
                                type="password"
                                color="light"
                                className="pl-9"
                                {...register("old_password", { required: true })}
                            />
                            <Lock className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        </div>
                        <FieldError errors={[errors.old_password]} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="new_password">Новый пароль</FieldLabel>
                        <div className="relative">
                            <Input
                                id="new_password"
                                type="password"
                                color="light"
                                className="pl-9"
                                {...register("new_password", { required: true })}
                            />
                            <KeyRound className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        </div>
                        <FieldError errors={[errors.new_password]} />
                    </Field>
                </CardContent>

                <CardFooter className="flex justify-end pt-6 border-t mt-6">
                    <Button
                        type="submit"
                        disabled={pending}
                        variant="black"
                        size="lg"
                        loading={pending}
                    >
                        Изменить пароль
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};
