"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { PenLine, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { roleSchema, type RoleSchemaType } from "@/schemas/role.schema";
import { useRouter } from "@/i18n/navigation";
import { createRole } from "@/api/roles/create-role.api";
import { useSession } from "next-auth/react";
import type { Role } from "@/types/roles.type";
import { editRole } from "@/api/roles/edit-role.api";

export const EditRole = ({ role }: Props) => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RoleSchemaType>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: role.name
        }
    });

    const session = useSession();

    const onSubmit = (values: RoleSchemaType) => {
        startTransition(async () => {

            const response = await editRole({
                id: role.id,
                body: values,
                token: session.data?.user.accessToken
            })

            if (!response.ok) {
                toast.error(response.data.detail);
                return;
            }

            toast.success("Роль создана");
            router.refresh();
            reset();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <PenLine className="hover:text-red-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />

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

interface Props {
    role: Role;
}