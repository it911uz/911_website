"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { Plus } from "lucide-react";

export const CreateTask = () => {
    const { open, onOpenChange } = useOpen();

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Button className="text-lg" onClick={() => onOpenChange(true)} size={"md"} variant={"black"}>
            <Plus />

            <span>
                Добавить задач
            </span>
        </Button>

        <SheetContent className="w-2/5">
            <SheetHeader>
                <SheetTitle>Создание лид</SheetTitle>
            </SheetHeader>

            <form className="space-y-5">
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Имя
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите имя" />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="phone">
                        Телефон номер
                    </FieldLabel>

                    <Input id="phone" type="tel" sizes={"lg"} color="light" placeholder="Введите телефон" />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="email">
                        Электронная почта
                    </FieldLabel>

                    <Input id="email" type="email" sizes={"lg"} color="light" placeholder="Введите почту" />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="organization_name">
                        Название организации
                    </FieldLabel>

                    <Input id="organization_name" type="text" sizes={"lg"} color="light" placeholder="Введите название организации" />
                </Field>

                <Button type="submit" size={"lg"} variant={"black"}>Создать</Button>
            </form>
        </SheetContent>
    </Sheet>
};