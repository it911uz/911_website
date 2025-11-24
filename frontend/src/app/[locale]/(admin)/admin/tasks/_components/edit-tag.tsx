"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import type { Tag } from "@/types/tasks.type";
import { tagSchema, type TagSchemaType } from "@/schemas/tag.schema";
import { editTag } from "@/api/tags/edit-tag";
import { deleteTag } from "@/api/tags/delete-tag";
import { toastErrorResponse } from "@/lib/toast-error-response.util";

export const EditTag = ({ tag }: Props) => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const session = useSession();
    const { register, handleSubmit, formState: { errors } } = useForm<TagSchemaType>({
        resolver: zodResolver(tagSchema),
        defaultValues: tag
    });
    const router = useRouter();

    const onSubmit = (values: TagSchemaType) => {
        startTransition(async () => {
            const response = await editTag({
                body: values,
                token: session.data?.user.accessToken,
                id: tag.id
            });

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Тег редактирован");
            router.refresh();
            onOpenChange(false);
        })
    }

    const onDelete = () => {
        startTransition(async () => {
            const response = await deleteTag({
                id: tag.id,
                token: session.data?.user.accessToken
            });

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Тег удален");
            router.refresh();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <span onClick={() => onOpenChange(true)} className="border rounded-full px-3 cursor-pointer" style={{ borderColor: tag.hex }}>
            {tag.name}
        </span>

        <SheetContent className="w-1/5">
            <SheetHeader>
                <SheetTitle>Редактировать тега</SheetTitle>
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
                    <FieldLabel className="text-lg" required htmlFor="hex">
                        Цвет
                    </FieldLabel>

                    <Input id="hex" type="color" sizes={"lg"} color="light" placeholder="Введите цвет" {...register("hex")} />

                    <ErrorMassage error={errors.hex?.message} />
                </Field>

                <div className="flex gap-5">
                    <Button loading={pending} type="submit" size={"lg"} variant={"black"}>Создать</Button>

                    <Button loading={pending} onClick={onDelete} size={"lg"} variant={"red"}>Удалить</Button>
                </div>
            </form>
        </SheetContent>
    </Sheet>
};

interface Props {
    tag: Tag
}