"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { PenLine } from "lucide-react";

export const ColumnEdit = () => {
    const { open, onOpenChange } = useOpen();

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <PenLine className="hover:text-blue-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />

        <SheetContent className="w-md">
            <SheetHeader>
                <SheetTitle>Редактирование</SheetTitle>
            </SheetHeader>

            <form className="space-y-4">
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Имя
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите имя" />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="hex">
                        Цвет
                    </FieldLabel>

                    <Input color="light" defaultValue={"#000"} id="hex" type="color" sizes={"lg"} />
                </Field>

                <Button variant={"black"} size={"lg"}>
                    сохранить
                </Button>
            </form>
        </SheetContent>
    </Sheet>
}