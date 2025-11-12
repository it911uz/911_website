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
import { roleSchema, type RoleSchemaType } from "@/schemas/role.schema";
import { useRouter } from "@/i18n/navigation";
import { createRole } from "@/api/roles/create-role.api";
import { useSession } from "next-auth/react";

export const CreateEmploy = () => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RoleSchemaType>({
        resolver: zodResolver(roleSchema)
    });

    const session = useSession();

    const onSubmit = (values: RoleSchemaType) => {
        startTransition(async () => {

            

            toast.success("Сотрудник создан");
            router.refresh();
            reset();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Button className="text-lg" onClick={() => onOpenChange(true)} size={"md"} variant={"black"}>
            <Plus />

            <span>
                Создать роль
            </span>
        </Button>

        <SheetContent className="w-fit">
            <SheetHeader>
                <SheetTitle>Создание роли</SheetTitle>
            </SheetHeader>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="name">
                        Название
                    </FieldLabel>

                    <Input id="name" type="text" sizes={"lg"} color="light" placeholder="Введите название" {...register("name")} />

                    <ErrorMassage error={errors.name?.message} />
                </Field>

                <Button loading={pending} type="submit" size={"lg"} variant={"black"}>Создать</Button>
            </form>
        </SheetContent>
    </Sheet>
};