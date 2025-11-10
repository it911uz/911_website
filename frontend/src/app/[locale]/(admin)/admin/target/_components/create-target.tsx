"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { targetSchema, type TargetSchemaType } from "@/schemas/target.schema";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMassage } from "@/components/ui/error-message";

export const CreateTarget = () => {
    const { open, onOpenChange } = useOpen();

    const { register, handleSubmit, formState: { errors } } = useForm<TargetSchemaType>({
        resolver: zodResolver(targetSchema)
    })

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Button size={"md"} variant={"black"} onClick={() => onOpenChange(true)}>
            <Plus />

            <span>
                Добавить
            </span>
        </Button>

        <SheetContent className="w-1/5">
            <SheetHeader>
                <SheetTitle>Создать таргет</SheetTitle>
            </SheetHeader>

            <form className="space-y-1.5">
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Название
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите имя" {...register("name")} />

                    <ErrorMassage error={errors.name?.message} />
                </Field>

                <Button variant={"black"} size={"lg"}>
                    Сохранить
                </Button>
            </form>
        </SheetContent>
    </Sheet>
}