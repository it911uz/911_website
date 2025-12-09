"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { PenLine } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { roleSchema, type RoleSchemaType } from "@/schemas/role.schema";
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import type { Role } from "@/types/roles.type";
import { editRole } from "@/api/roles/edit-role.api";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { SelectPermissions } from "./select-permissions";
import { createRolePermissions } from "@/api/roles/create-role-permissions.api";

export const EditRole = ({ role }: Props) => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<RoleSchemaType>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: role.name,
            permissions: role.permissions.map(permission => permission.id.toString())
        }
    });

    const session = useSession();

    const updateRoleName = async (values: RoleSchemaType) => {
        const response = await editRole({
            id: role.id,
            body: values,
            token: session.data?.user.accessToken
        })

        if (!response.ok) {
            toastErrorResponse(response.data)
            return response
        }

        toast.success("Роль изменена");
        return response
    }

    const updateRolePermissions = async (values: RoleSchemaType) => {
        const response = await createRolePermissions({
            body: {
                role_id: role.id,
                permissions: values?.permissions || []
            },
            token: session.data?.user.accessToken
        })

        if (!response.ok) {
            toastErrorResponse(response.data)
            return response
        }

        toast.success("Роль изменена");
        return response
    }

    const onSubmit = (values: RoleSchemaType) => {
        startTransition(async () => {

            const [name, permissions] = await Promise.all([
                updateRoleName(values),
                updateRolePermissions(values)
            ]);

            if (!name.ok || !permissions.ok) {
                return;
            }

            router.refresh();
            reset();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <PenLine className="hover:text-red-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />

        <SheetContent className="w-2/5">
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

                <Controller
                    control={control}
                    name="permissions"
                    render={({ field }) => (
                        <Field>
                            <FieldLabel className="text-lg" required htmlFor="permissions">
                                Права
                            </FieldLabel>

                            <SelectPermissions onValueChange={field.onChange} defaultValue={field.value} />
                        </Field>
                    )}
                />

                <Button loading={pending} type="submit" size={"lg"} variant={"black"}>Создать</Button>
            </form>
        </SheetContent>
    </Sheet>
};

interface Props {
    role: Role;
}