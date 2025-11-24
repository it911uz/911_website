"use client";

import { useForm } from "react-hook-form";
import type { UserDetail } from "@/types/user.type";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

const profileSchema = z.object({
    full_name: z.string().min(2),
    username: z.string().min(3),
    email: z.string().email(),
    phone_number: z.string().nullable().optional(),
    role: z.any(),
    is_superuser: z.boolean(),
});



export const ProfileForm = ({ user }: Props) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: user,
    });

    const onSubmit = (data: ProfileFormValues) => {
        console.log("Данные профиля для отправки:", data);
    };

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
                        disabled={isSubmitting}
                        variant={"black"}
                        size={"lg"}
                    >
                        {isSubmitting ? "Сохранение..." : "Сохранить"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

type ProfileFormValues = z.infer<typeof profileSchema>;

interface Props {
    user: UserDetail;
}