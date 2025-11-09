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
import { ErrorMassage } from "@/components/ui/error-message";
import { messageSchema, type MessageSchemaType } from "@/schemas/lead.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLeadComments } from "@/api/hooks/use-leads.api";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

export const LeadOption = ({ leadId }: Props) => {
    const { open, onOpenChange } = useOpen();
    const session = useSession();
    const queryClient = useQueryClient();

    const { data } = useLeadComments({
        leadId,
        token: session.data?.user?.accessToken,
        enabled: open
    });

    const { handleSubmit, control } = useForm<MessageSchemaType>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            message: "",
            files: [],
        }
    });

    const onSubmit = (values: MessageSchemaType) => {
        console.log("✅ Форм-данные:", values);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <CircleEllipsis
                className="hover:text-blue-500 text-2xl cursor-pointer"
                onClick={() => onOpenChange(true)}
            />

            <SheetContent className="max-w-5xl">
                <SheetHeader>
                    <SheetTitle>Задача</SheetTitle>
                </SheetHeader>

                <Accordion type="single" className="w-full space-y-1.5">
                    {data?.data.items?.map((message) => (
                        <AccordionItem key={message.id} value={message.id + ""}>
                            <AccordionTrigger className="cursor-pointer">
                                {message.comment.length > 50 ? message.comment.substring(0, 50) + "..." : message.comment}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div dangerouslySetInnerHTML={{
                                    __html: message.comment
                                }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        control={control}
                        name="message"
                        render={({ field, fieldState }) => (
                            <Field>
                                <CustomSunEditor defaultValue={field.value} onChange={field.onChange} />
                                <ErrorMassage error={fieldState.error?.message} />
                            </Field>
                        )}
                    />

                    <Controller
                        control={control}
                        name="files"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="text-lg" htmlFor="files">
                                    Файл
                                </FieldLabel>

                                <Input
                                    id="files"
                                    type="file"
                                    sizes={"lg"}
                                    color="light"
                                    multiple
                                    onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                                />

                                <ErrorMassage error={fieldState.error?.message} />
                            </Field>
                        )}
                    />

                    <Button type="submit" variant="black" size="lg">
                        Сохранить
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};

const messages = [
    { id: 1, create_at: new Date(), message: "Привет 1" },
    { id: 2, create_at: new Date(), message: "Привет 2" },
    { id: 3, create_at: new Date(), message: "Привет 3" },
] as const;

interface Props {
    leadId: number;
}
