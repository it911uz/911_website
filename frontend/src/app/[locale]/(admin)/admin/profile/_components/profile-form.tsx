"use client";

import { useForm } from "react-hook-form";
import type { UserDetail } from "@/types/user.type";
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
import { Mail, User, Phone, Briefcase, KeyRound } from "lucide-react";
import { ErrorMassage } from "@/components/ui/error-message";
import { type EmploySchemaType } from "@/schemas/employ.schema";
import { useTransition } from "react";
import { editUser } from "@/api/users/edit-user.api";
import { useSession } from "next-auth/react";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

export const ProfileForm = ({ user }: Props) => {
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const session = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EmploySchemaType>({
        defaultValues: {
            email: user.email,
            full_name: user.full_name,
            username: user.username,
        },
    });

    const onSubmit = (values: Omit<EmploySchemaType, "password">) => {
        startTransition(async () => {

            const response = await editUser({
                id: user.id,
                body: {
                    ...values,
                    role_id: user.role_id
                },
                token: session.data?.user.accessToken
            })

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Сотрудник изменен");
            router.refresh();
        })
    }

    return (
        <Card className="w-full max-w-4xl ">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700">
                    <User className="size-6" />
                    Профиль пользователя
                </CardTitle>
                <CardDescription>
                    Обновите информацию о своей учетной записи и личные данные.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-2">
                        <Label htmlFor="username">Имя пользователя</Label>
                        <div className="relative">
                            <Input
                                color="light"
                                id="username"
                                type="text"
                                className="pl-9"
                                {...register("username")}
                            />
                            <User className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        </div>

                        <ErrorMassage error={errors.username?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="full_name">Полное имя</Label>
                        <div className="relative">
                            <Input
                                color="light"
                                id="full_name"
                                type="text"
                                className="pl-9"
                                {...register("full_name")}
                            />
                            <KeyRound className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        </div>
                        <ErrorMassage error={errors.full_name?.message} />
                    </div>

                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input
                                color="light"
                                id="email"
                                type="email"
                                className="pl-9"
                                {...register("email")}
                            />
                            <Mail className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        </div>
                        <ErrorMassage error={errors.email?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone_number">Номер телефона</Label>
                        <div className="relative">
                            <Input
                                color="light"
                                id="phone_number"
                                type="tel"
                                className="pl-9"
                                defaultValue={user.phone_number || ""}
                                {...register("phone_number")}
                            />
                            <Phone className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        </div>
                        <ErrorMassage error={errors.phone_number?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Роль</Label>
                        <div className="relative">
                            <Input
                                color="light"
                                id="role"
                                value={user.role.name}
                                readOnly
                                className="pl-9 cursor-not-allowed"
                            />
                            <Briefcase className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-6 border-t mt-6">
                    <Button
                        type="submit"
                        disabled={pending}
                        variant={"black"}
                        size={"lg"}
                    >
                        {pending ? "Сохранение..." : "Сохранить"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

interface Props {
    user: UserDetail;
}