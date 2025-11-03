"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { Plus } from "lucide-react";

export const CreateColumn = () => {
    const { open, onOpenChange } = useOpen();

    return <Sheet open={open} onOpenChange={onOpenChange}>

        <Button className="text-lg" onClick={() => onOpenChange(true)} size={"md"} variant={"black"}>
            <Plus />
            <span>Добавить колонку</span>
        </Button>

        <SheetContent className="w-md">
            <SheetHeader>
                <SheetTitle>Добавить колонку</SheetTitle>
            </SheetHeader>

            <form className="space-y-4">
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Название
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