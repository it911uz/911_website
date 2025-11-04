"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { columnSchema, type ColumnSchemaType } from "@/schemas/lead.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useForm } from "react-hook-form";

export const ColumnEdit = () => {
    const { open, onOpenChange } = useOpen();

    const { register, handleSubmit, formState: { errors } } = useForm<ColumnSchemaType>({
        resolver: zodResolver(columnSchema)
    });

    const onSubmit = (values: ColumnSchemaType) => {
        console.log(values);
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <PenLine className="hover:text-blue-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />

        <SheetContent className="w-md">
            <SheetHeader>
                <SheetTitle>Редактирование</SheetTitle>
            </SheetHeader>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Имя
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите название" {...register("name")} />

                    <ErrorMassage error={errors.name?.message} />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="hex">
                        Цвет
                    </FieldLabel>

                    <Input color="light" defaultValue={"#000"} id="hex" type="color" sizes={"lg"} {...register("hex")} />

                    <ErrorMassage error={errors.hex?.message} />
                </Field>

                <Button variant={"black"} size={"lg"}>
                    Сохранить
                </Button>
            </form>
        </SheetContent>
    </Sheet>
}