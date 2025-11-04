"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CustomSunEditor } from "@/components/ui/editor";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { CircleEllipsis } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";

export const IssueOption = () => {
    const { open, onOpenChange } = useOpen();

    const { handleSubmit, control } = useForm<FormFields>();

    const onSubmit = (values: FormFields) => {
        console.log(values);
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <CircleEllipsis className="hover:text-blue-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />

        <SheetContent className="max-w-5xl">
            <SheetHeader>
                <SheetTitle>Задача</SheetTitle>
            </SheetHeader>

            <Accordion type="single" className="w-full space-y-1.5">
                {
                    messages.map(message => <AccordionItem key={message.id} value={message.id + ""}>
                        <AccordionTrigger className="cursor-pointer">
                            {dayjs(message.create_at).format("DD.MM.YYYY HH:mm")}
                        </AccordionTrigger>
                        <AccordionContent>
                            {message.message}
                        </AccordionContent>
                    </AccordionItem>)
                }

            </Accordion>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="message"
                    render={(field) => <Field>

                        <CustomSunEditor defaultValue={field.field.value} onChange={field.field.onChange} />

                    </Field>}
                />


                <Field>

                    <FieldLabel className="text-lg" htmlFor="files">
                        Файл
                    </FieldLabel>

                    <Input id="files" type="file" sizes={"lg"} color="light" placeholder="Введите имя" multiple />

                </Field>

                <Button variant={"black"} size={"lg"}>
                    Сохранить
                </Button>
            </form>
        </SheetContent>
    </Sheet>
};

interface FormFields {
    message: string;
}

const messages = [
    {
        id: 1,
        create_at: new Date(),
        message: "Привет"
    },
    {
        id: 2,
        create_at: new Date(),
        message: "Привет"
    },
    {
        id: 3,
        create_at: new Date(),
        message: "Привет"
    }
] as const;