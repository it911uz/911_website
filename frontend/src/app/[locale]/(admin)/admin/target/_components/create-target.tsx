"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { targetSchema, type TargetSchemaType } from "@/schemas/target.schema";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMassage } from "@/components/ui/error-message";
import { useTransition } from "react";
import { createTarget } from "@/api/target/create-target.api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

export const CreateTarget = () => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm<TargetSchemaType>({
        resolver: zodResolver(targetSchema)
    });
    const session = useSession();
    const router = useRouter();

    const onSubmit = (values: TargetSchemaType) => {
        startTransition(async () => {
            const response = await createTarget({
                token: session.data?.user.accessToken,
                body: values
            });

            if (!response.ok) {
                toast.error(response.data.detail || "Произошла ошибка")
                return;
            }

            toast.success("Таргет создан");
            router.refresh();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Button size={"md"} variant={"black"} onClick={() => onOpenChange(true)}>
            <Plus />

            <span>
                Добавить
            </span>
        </Button>

        <SheetContent className="w-1/5">
            <SheetHeader>
                <SheetTitle>Создать таргет</SheetTitle>
            </SheetHeader>

            <form className="space-y-1.5" onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Название
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите имя" {...register("name")} />

                    <ErrorMassage error={errors.name?.message} />
                </Field>

                <Button loading={pending} variant={"black"} size={"lg"}>
                    Сохранить
                </Button>
            </form>
        </SheetContent>
    </Sheet>
}