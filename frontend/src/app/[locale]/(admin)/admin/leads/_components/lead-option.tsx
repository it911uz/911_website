"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CustomSunEditor } from "@/components/ui/editor";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { CircleEllipsis, FolderDown, Mail, Phone, FileText } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { ErrorMassage } from "@/components/ui/error-message";
import { messageSchema, type MessageSchemaType } from "@/schemas/lead.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    leadsQueryKey,
    useLeadComments,
    useLeadFiles,
} from "@/api/hooks/use-leads.api";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import type { LeadType } from "./columns";
import { useTransition } from "react";
import { createLeadComment } from "@/api/leads/create-lead-comment.api";
import { toast } from "sonner";
import { uploadLeadFile } from "@/api/leads/upload-lead-file.api";
import { DeleteLeadFile } from "./delete-lead-file";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { SelectStatus } from "./select-status";
import { DeleteLead } from "./delete-lead";

export const LeadOption = ({ lead }: Props) => {
    const { open, onOpenChange } = useOpen();
    const session = useSession();
    const queryClient = useQueryClient();
    const [pending, startTransition] = useTransition();

    const { data } = useLeadComments({
        leadId: lead.id,
        token: session.data?.user?.accessToken,
    });

    const { data: files } = useLeadFiles({
        leadId: lead.id,
        token: session.data?.user?.accessToken,
        enabled: open,
    });

    const { handleSubmit, control, setValue } = useForm<MessageSchemaType>({
        resolver: zodResolver(messageSchema),
        defaultValues: { message: "", files: [] },
    });

    const addComment = async (value: MessageSchemaType["message"]) => {
        const response = await createLeadComment({
            leadId: lead.id,
            token: session.data?.user.accessToken,
            body: { comment: value },
        });

        if (!response.ok) {
            toast.error(response.data.detail || "Произошла ошибка");
            return;
        }

        toast.success("Комментарий добавлен");
        queryClient.invalidateQueries({
            queryKey: leadsQueryKey.comments.getComments(lead.id),
        });
        setValue("message", "");
    };

    const addFiles = async (values: MessageSchemaType["files"]) => {
        if (!values?.length) return;

        await Promise.all(
            values.map(async (file) => {
                const formData = new FormData();
                formData.append("lead_file", file);

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
                className="hover:text-blue-500 text-2xl cursor-pointer transition-transform hover:scale-110"
                onClick={() => onOpenChange(true)}
            />

            <SheetContent className="max-w-5xl bg-linear-to-br from-gray-50 to-gray-100 overflow-y-auto">
                <SheetHeader className="mb-6 border-b pb-4">
                    <SheetTitle className="text-2xl font-semibold text-gray-800">
                        Задача: {lead.company_name}
                    </SheetTitle>
                    <div className="flex justify-between gap-5">
                        <div className="space-y-3">
                            {lead.phone && (
                                <span className="flex items-center gap-2 text-gray-700">
                                    <Phone size={16} className="text-blue-600" />
                                    <a
                                        href={`tel:${lead.phone}`}
                                        className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition"
                                    >
                                        {lead.phone}
                                    </a>
                                </span>
                            )}

                            {lead.email && (
                                <span className="flex items-center gap-2 text-gray-700 break-all">
                                    <Mail size={16} className="text-blue-600" />
                                    <a
                                        href={`mailto:${lead.email}`}
                                        className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition"
                                    >
                                        {lead.email}
                                    </a>
                                </span>
                            )}
                        </div>

                        <div className="flex gap-5 items-center">
                            <SelectStatus lead={lead} />

                            <DeleteLead leadId={lead.id} />
                        </div>
                    </div>
                </SheetHeader>

                <form
                    className="space-y-6 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        control={control}
                        name="message"
                        render={({ field, fieldState }) => (
                            <Field>
                                <CustomSunEditor
                                    setContents={field.value}
                                    defaultValue={field.value}
                                    onChange={field.onChange}
                                />
                                <ErrorMassage error={fieldState.error?.message} />
                            </Field>
                        )}
                    />

                    <Controller
                        control={control}
                        name="files"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="text-lg font-medium text-gray-700 mb-2">
                                    📎 Прикрепить файлы
                                </FieldLabel>

                                <Input
                                    id="files"
                                    type="file"
                                    sizes={"lg"}
                                    color="light"
                                    multiple
                                    onChange={(e) =>
                                        field.onChange(Array.from(e.target.files || []))
                                    }
                                />
                                <ErrorMassage error={fieldState.error?.message} />
                            </Field>
                        )}
                    />

                    <Button
                        loading={pending}
                        type="submit"
                        variant="black"
                        size="lg"
                        className=" text-white shadow-md transition-all"
                    >
                        Сохранить комментарий
                    </Button>
                </form>

                {files?.data?.length ? (
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <FileText className="text-blue-600" size={20} />
                            Прикреплённые файлы
                        </h3>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {files.data.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between items-center p-4 rounded-xl bg-white/70 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-blue-600">
                                            <FolderDown size={24} />
                                        </div>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-gray-700 hover:text-blue-600 break-all"
                                        >
                                            {item.filename}
                                        </a>
                                    </div>

                                    <div className="text-gray-400 hover:text-red-500 transition-colors">
                                        <DeleteLeadFile id={item.id} leadId={lead.id} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                <Accordion
                    type="single"
                    collapsible
                    className="mt-10 w-full space-y-3 mb-10"
                >
                    {data?.data?.map((message) => (
                        <AccordionItem
                            key={message.id}
                            value={message.id.toString()}
                            className={cn(
                                "rounded-2xl border border-gray-200 bg-white/70 shadow-sm hover:shadow-md transition-all"
                            )}
                        >
                            <AccordionTrigger className="flex justify-between items-center px-6 py-4 text-gray-800 font-medium hover:text-blue-600 cursor-pointer">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
                                    <p className="flex items-center gap-2 text-base">
                                        <span className="text-blue-600">👤</span>
                                        <span>{message.user?.full_name ?? "Неизвестный пользователь"}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {dayjs(message.created_at).format("DD.MM.YYYY в HH:mm")}
                                    </p>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="px-6 py-4 bg-gray-50 rounded-b-2xl space-y-3">
                                <div
                                    className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: message.comment,
                                    }}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </SheetContent>
        </Sheet>
    );
};

interface Props {
    lead: LeadType;
}
