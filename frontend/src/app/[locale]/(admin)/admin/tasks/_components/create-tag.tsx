"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { tagSchema, type TagSchemaType } from "@/schemas/tag.schema";
import { createTag } from "@/api/tags/create-tag.api";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";

export const CreateTag = () => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const session = useSession();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TagSchemaType>({
        resolver: zodResolver(tagSchema)
    });
    const router = useRouter();

    const onSubmit = (values: TagSchemaType) => {
        startTransition(async () => {
            const response = await createTag({
                body: values,
                token: session.data?.user.accessToken
            });

            if (!response.ok) {
                toast.error(response.data.detail || "Произошла ошибка")
                return;
            }

            toast.success("Тег создан");
            reset();
            router.refresh();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Button className="text-lg" onClick={() => onOpenChange(true)} size={"md"} variant={"black"}>
            <Plus />

            <span>
                Добавить тег
            </span>
        </Button>

        <SheetContent className="w-1/5">
            <SheetHeader>
                <SheetTitle>Создание тега</SheetTitle>
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

                <Button loading={pending} type="submit" size={"lg"} variant={"black"}>Создать</Button>
            </form>
        </SheetContent>
    </Sheet>
};