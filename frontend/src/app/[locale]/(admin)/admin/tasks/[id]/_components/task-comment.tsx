"use client";

import { createTaskComment } from "@/api/tasks/create-task-comment.api";
import { uploadTaskFile } from "@/api/tasks/upload-task-file.api";
import { Button } from "@/components/ui/button";
import { CustomSunEditor } from "@/components/ui/editor";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PERMISSIONS } from "@/const/permissions.const";
import { useRouter } from "@/i18n/navigation";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { taskCommentSchema, type TaskCommentSchemaType } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const TaskComment = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [pending, startTransition] = useTransition();
    const session = useSession();
    const { control, handleSubmit, setValue } = useForm<TaskCommentSchemaType>({
        resolver: zodResolver(taskCommentSchema),
    });

    const addComment = async (values: TaskCommentSchemaType) => {
        const response = await createTaskComment({
            body: values,
            token: session.data?.user.accessToken,
            taskId: Number(id),
        });

        if (!response.ok) {
            toastErrorResponse(response.data)
            return;
        }

        toast.success("Сообщение отправлено");
        router.refresh();
    }

    const addFiles = async (values: TaskCommentSchemaType["files"]) => {
        if (!values?.length) return;

        await Promise.all(
            values.map(async (file) => {
                const formData = new FormData();
                formData.append("task_file", file);

                await uploadTaskFile({
                    taskId: Number(id),
                    body: formData,
                    token: session.data?.user?.accessToken,
                });
            })
        );

        toast.success("Файлы успешно загружены");
        router.refresh();
        setValue("files", []);
    };

    const onSubmit = (values: TaskCommentSchemaType) => {
        startTransition(async () => {
            await addComment(values);

            await addFiles(values.files);
        });
    };

    const canCreateTaskComment = session.data?.user.permissions.includes(PERMISSIONS.create_task_comments)

    return canCreateTaskComment && (
        <form
            className="space-y-6 bg-white/60 backdrop-blur p-6 rounded-2xl shadow border border-gray-200"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h3 className="text-xl font-semibold">Добавить комментарий</h3>

            <Controller
                name="comment"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Field>
                        <CustomSunEditor
                            setContents={field.value}
                            defaultValue={field.value}
                            onChange={field.onChange}
                        />
                        <FieldError errors={[error]} />
                    </Field>
                )}
            />

            <Controller
                name="files"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Field>
                        <FieldLabel className="text-lg font-medium text-gray-700 mb-2">
                            📎 Прикрепить файлы
                        </FieldLabel>

                        <Input
                            id="files"
                            type="file"
                            multiple
                            sizes={"lg"}
                            color="light"
                            onChange={(e) =>
                                field.onChange(Array.from(e.target.files || []))
                            }
                        />
                        <FieldError errors={[error]} />
                    </Field>
                )}
            />

            <Button
                loading={pending}
                type="submit"
                variant="black"
                size="lg"
                className="text-white shadow-md"
            >
                Сохранить комментарий
            </Button>
        </form>
    );
};


interface FormFields {
    message: string;
    files: File[];
}