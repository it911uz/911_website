"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { targetSchema, type TargetSchemaType } from "@/schemas/target.schema";
import { PenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMassage } from "@/components/ui/error-message";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { updateTarget } from "@/api/target/update-target.api";
import type { Target } from "@/types/target.type";

export const UpdateTarget = ({ target }: Props) => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm<TargetSchemaType>({
        resolver: zodResolver(targetSchema),
        defaultValues: target,
    });
    const session = useSession();
    const router = useRouter();

    const onSubmit = (values: TargetSchemaType) => {
        startTransition(async () => {
            const response = await updateTarget({
                token: session.data?.user.accessToken,
                body: {
                    name: values.name,
                    is_active: values.is_active ?? false,
                },
                id: target.id
            });

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Таргет изменён");
            router.refresh();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <PenLine className="hover:text-blue-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />

        <SheetContent className="w-1/5">
            <SheetHeader>
                <SheetTitle>Изменить таргет</SheetTitle>
            </SheetHeader>

            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Название
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите имя" {...register("name")} />

                    <ErrorMassage error={errors.name?.message} />
                </Field>

                <Field>
                    <FieldLabel className="text-lg" required htmlFor="is_active">
                        Активность
                    </FieldLabel>

                    <div>
                        <Input id="is_active" type="checkbox" sizes={"lg"} color="light" {...register("is_active")} />
                    </div>

                    <ErrorMassage error={errors.name?.message} />
                </Field>

                <Button loading={pending} variant={"black"} size={"lg"}>
                    Сохранить
                </Button>
            </form>
        </SheetContent>
    </Sheet>
}

interface Props {
    target: Target
}