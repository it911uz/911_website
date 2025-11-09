"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CustomSunEditor } from "@/components/ui/editor";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { CircleEllipsis, FolderDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { ErrorMassage } from "@/components/ui/error-message";
import { messageSchema, type MessageSchemaType } from "@/schemas/lead.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadsQueryKey, useLeadComments, useLeadFiles } from "@/api/hooks/use-leads.api";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import type { LeadType } from "./columns";
import { useTransition } from "react";
import { createLeadComment } from "@/api/leads/create-lead-comment.api";
import { toast } from "sonner";
import { uploadLeadFile } from "@/api/leads/upload-lead-file.api";

export const LeadOption = ({ lead }: Props) => {
    const { open, onOpenChange } = useOpen();
    const session = useSession();
    const queryClient = useQueryClient();
    const [pending, startTransition] = useTransition()

    const { data } = useLeadComments({
        leadId: lead.id,
        token: session.data?.user?.accessToken,
        enabled: open
    });

    const { data: files } = useLeadFiles({
        leadId: lead.id,
        token: session.data?.user?.accessToken,
        enabled: open
    });

    const { handleSubmit, control, setValue } = useForm<MessageSchemaType>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            message: "",
            files: [],
        }
    });

    const addComment = async (value: MessageSchemaType["message"]) => {
        const response = await createLeadComment({
            leadId: lead.id,
            token: session.data?.user.accessToken,
            body: {
                comment: value
            }
        });

        if (!response.ok) {
            toast.error("Произошла ошибка");
            return;
        }

        toast.success("Комментарий создан");
        queryClient.invalidateQueries({
            queryKey: leadsQueryKey.comments.getComments(lead.id),
        });
        setValue("message", "");
    }

    const addFiles = async (values: MessageSchemaType["files"]) => {
        if (!values?.length) return;

        await Promise.all(
            values.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);

                await uploadLeadFile({
                    lead_id: lead.id,
                    body: formData,
                    token: session.data?.user?.accessToken,
                });
            })
        );

        toast.success("Файлы успешно загружены");
        queryClient.invalidateQueries({
            queryKey: leadsQueryKey.files.getFiles(lead.id),
        });
        setValue("files", []);
    };


    const onSubmit = (values: MessageSchemaType) => {
        startTransition(async () => {
            await addComment(values.message);
            await addFiles(values.files);
        });
    };


    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <CircleEllipsis
                className="hover:text-blue-500 text-2xl cursor-pointer"
                onClick={() => onOpenChange(true)}
            />

            <SheetContent className="max-w-5xl">
                <SheetHeader>
                    <SheetTitle>Задача: {lead.company_name}</SheetTitle>
                </SheetHeader>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        control={control}
                        name="message"
                        render={({ field, fieldState }) => (
                            <Field>
                                <CustomSunEditor setContents={field.value} defaultValue={field.value} onChange={field.onChange} />
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

                    <Button loading={pending} type="submit" variant="black" size="lg">
                        Сохранить
                    </Button>
                </form>

                {files?.data?.length ? (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-3">Прикреплённые файлы</h3>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {files.data.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-6 p-3 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white"
                                >
                                    <div className="shrink-0 text-blue-600">
                                        <FolderDown size={32} />
                                    </div>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-gray-700 hover:text-blue-600 break-all"
                                    >
                                        {item.filename}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                <Accordion type="single" className="space-y-1.5 w-full">
                    {data?.data.items?.map((message) => (
                        <AccordionItem key={message.id} value={message.id.toString()}>
                            <AccordionTrigger className="cursor-pointer">
                                <div dangerouslySetInnerHTML={{
                                    __html: message.comment.length > 50 ? message.comment.substring(0, 50) + "..." : message.comment
                                }} />
                            </AccordionTrigger>
                            <AccordionContent>
                                <div dangerouslySetInnerHTML={{
                                    __html: message.comment
                                }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </SheetContent>
        </Sheet>
    );
};

interface Props {
    lead: LeadType
}
