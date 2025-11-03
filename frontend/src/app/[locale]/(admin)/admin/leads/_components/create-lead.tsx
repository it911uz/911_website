"use client";

import { Button } from "@/components/ui/button";
import { CustomSunEditor } from "@/components/ui/editor";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { leadSchema, type LeadSchemaType } from "@/schemas/lead.schema";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateLead = () => {
    const { open, onOpenChange } = useOpen();

    const { register, handleSubmit, formState: { errors }, control } = useForm<LeadSchemaType>({
        resolver: zodResolver(leadSchema)
    });

    const onSubmit = (values: LeadSchemaType) => {
        console.log(values);
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Button className="text-lg" onClick={() => onOpenChange(true)} size={"md"} variant={"black"}>
            <Plus />

            <span>
                Добавить лид
            </span>
        </Button>

        <SheetContent className="w-2/5">
            <SheetHeader>
                <SheetTitle>Создание лид</SheetTitle>
            </SheetHeader>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Имя
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите имя" {...register("full_name")} />

                    <ErrorMassage error={errors.full_name?.message} />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="phone">
                        Телефон номер
                    </FieldLabel>

                    <Input id="phone" type="tel" sizes={"lg"} color="light" placeholder="Введите телефон" {...register("phone")} />

                    <ErrorMassage error={errors.phone?.message} />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="email">
                        Электронная почта
                    </FieldLabel>

                    <Input id="email" type="email" sizes={"lg"} color="light" placeholder="Введите почту" {...register("email")} />

                    <ErrorMassage error={errors.email?.message} />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="organization_name">
                        Название организации
                    </FieldLabel>

                    <Input id="organization_name" type="text" sizes={"lg"} color="light" placeholder="Введите название организации" {...register("company_name")} />

                    <ErrorMassage error={errors.company_name?.message} />
                </Field>

                <Controller
                    name="company_info"
                    control={control}
                    render={({ field }) => <Field>
                        <FieldLabel className="text-lg" required htmlFor="company_info">
                            Описание организации
                        </FieldLabel>

                        <CustomSunEditor defaultValue={field.value} onChange={field.onChange} />
                    </Field>}
                />

                <Button type="submit" size={"lg"} variant={"black"}>Создать</Button>
            </form>
        </SheetContent>
    </Sheet>
};