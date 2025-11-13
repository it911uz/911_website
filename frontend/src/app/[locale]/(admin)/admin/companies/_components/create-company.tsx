"use client";

import { Button } from "@/components/ui/button";
import { CustomSunEditor } from "@/components/ui/editor";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { companySchema, type CompanySchemaType } from "@/schemas/company.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/navigation";
import { createCompany } from "@/api/companies/create-company.api";

export const CreateCompany = () => {
    const { open, onOpenChange } = useOpen();
    const session = useSession();
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset, control } =
        useForm<CompanySchemaType>({
            resolver: zodResolver(companySchema),
        });

    const onSubmit = (values: CompanySchemaType) => {
        startTransition(async () => {
            const response = await createCompany({
                body: values,
                token: session.data?.user.accessToken
            });

            if (!response.ok) {
                toast.error(response.data.detail);
                return;
            }

            toast.success("Компания создана");
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
                size={"md"}
                variant={"black"}
            >
                <Plus />
                <span>Добавить</span>
            </Button>

            <SheetContent className="w-2/5">
                <SheetHeader>
                    <SheetTitle>Добавить компанию</SheetTitle>
                </SheetHeader>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Field>
                        <FieldLabel className="text-lg" required htmlFor="name">
                            Название компании
                        </FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            sizes={"lg"}
                            color="light"
                            placeholder="Введите название"
                            {...register("name")}
                        />
                        <ErrorMassage error={errors.name?.message} />
                    </Field>

                    <Field>
                        <FieldLabel className="text-lg" required htmlFor="phone_number">
                            Телефон номер
                        </FieldLabel>
                        <Input
                            id="phone_number"
                            type="tel"
                            sizes={"lg"}
                            color="light"
                            placeholder="Введите номер"
                            {...register("phone_number")}
                        />
                        <ErrorMassage error={errors.phone_number?.message} />
                    </Field>

                    <Controller
                        name="info"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel className="text-lg" required htmlFor="info">
                                    Описание компании
                                </FieldLabel>
                                <CustomSunEditor
                                    defaultValue={field.value}
                                    onChange={field.onChange}
                                />
                                <ErrorMassage error={errors.info?.message} />
                            </Field>
                        )}
                    />

                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel className="text-lg" required htmlFor="status">
                                    Статус
                                </FieldLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value ?? ""}
                                >
                                    <SelectTrigger size="lg" id="status" className="w-full">
                                        <SelectValue placeholder="Выберите статус" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectItem value="active">Активна</SelectItem>
                                        <SelectItem value="inactive">Неактивна</SelectItem>
                                        <SelectItem value="pending">Ожидает</SelectItem>
                                    </SelectContent>
                                </Select>
                                <ErrorMassage error={errors.status?.message} />
                            </Field>
                        )}
                    />

                    <Button loading={pending} variant={"black"} size={"lg"} type="submit">
                        Сохранить
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};
