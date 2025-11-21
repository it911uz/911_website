"use client";

import { Button } from "@/components/ui/button";
import { CustomSunEditor } from "@/components/ui/editor";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { taskSchema, type TaskSchemaType } from "@/schemas/task.schema";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { SelectStatus } from "./select-status";
import { SelectTags } from "./select-tags";
import { SelectUsers } from "./select-users";
import { createTask } from "@/api/tasks/create-task.api";

export const CreateTask = () => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const session = useSession();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<TaskSchemaType>({
        resolver: zodResolver(taskSchema)
    });

    const onSubmit = (values: TaskSchemaType) => {
        startTransition(async () => {
            const response = await createTask({
                body: {
                    deadline: values.deadline,
                    description: values.description,
                    name: values.name,
                    status_id: values.status_id,
                    tag_ids: values.tags,
                    user_ids: values.users
                },
                token: session.data?.user.accessToken
            });

            if (!response.ok) {
                toast.error(response.data.detail || "Произошла ошибка")
                return;
            }

            toast.success("Таск создан");
            router.refresh();
            reset();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Button className="text-lg" onClick={() => onOpenChange(true)} size={"md"} variant={"black"}>
            <Plus />

            <span>
                Добавить таск
            </span>
        </Button>

        <SheetContent className="w-3/5">
            <SheetHeader>
                <SheetTitle>Создание таска</SheetTitle>
            </SheetHeader>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Название
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите название" {...register("name")} />

                    <ErrorMassage error={errors.name?.message} />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="deadline">
                        Срок выполнения
                    </FieldLabel>

                    <Input id="deadline" type="date" sizes={"lg"} color="light" placeholder="Введите дедлайн" {...register("deadline")} />

                    <ErrorMassage error={errors.deadline?.message} />
                </Field>

                <Controller
                    name="status_id"
                    control={control}
                    render={({ field }) => <Field>
                        <FieldLabel className="text-lg" required htmlFor="status_id">
                            Статус
                        </FieldLabel>

                        <SelectStatus onValueChange={(v) => field.onChange(Number(v))} />

                        <ErrorMassage error={errors.status_id?.message} />
                    </Field>}
                />

                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => <Field>
                        <FieldLabel className="text-lg" required htmlFor="tags">
                            Теги
                        </FieldLabel>

                        <SelectTags
                            defaultValue={field.value?.map(String)}
                            onValueChange={(arr) => field.onChange(arr.map(Number))}
                        />

                        <ErrorMassage error={errors.tags?.message} />
                    </Field>}
                />

                <Controller
                    name="users"
                    control={control}
                    render={({ field }) => <Field>
                        <FieldLabel className="text-lg" required htmlFor="users">
                            Исполнители
                        </FieldLabel>

                        <SelectUsers
                            defaultValue={field.value?.map(String)}
                            onValueChange={(arr) => field.onChange(arr.map(Number))}
                        />
                    </Field>}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <Field>
                        <FieldLabel className="text-lg" required htmlFor="description">
                            Описание организации
                        </FieldLabel>

                        <CustomSunEditor defaultValue={field.value} onChange={field.onChange} />
                    </Field>}
                />

                <Button loading={pending} type="submit" size={"lg"} variant={"black"}>Создать</Button>
            </form>
        </SheetContent>
    </Sheet>
};