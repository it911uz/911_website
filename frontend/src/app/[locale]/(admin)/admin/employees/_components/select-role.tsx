"use client";

import { useGetRoles } from "@/api/hooks/use-roles.api";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EmploySchemaType } from "@/schemas/employ.schema";
import { useSession } from "next-auth/react";
import { Controller, type Control } from "react-hook-form";

export const SelectRole = ({ control }: Props) => {

    const session = useSession();

    const { data } = useGetRoles({
        token: session.data?.user?.accessToken
    });

    return <>
        <Controller
            control={control}
            name="role_id"
            render={({ field, formState: { errors } }) => (
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="role">
                        Роль
                    </FieldLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString() ?? ""}>
                        <SelectTrigger size="lg" id="role" className="w-full">
                            <SelectValue placeholder="Выберите роль" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {
                                data?.data.items?.length ? data?.data.items?.map((item) => (
                                    <SelectItem className="w-full" key={item.id} value={item.id.toString()}>
                                        {item.name}
                                    </SelectItem>
                                )) : <p>Ролей нет</p>
                            }
                        </SelectContent>
                    </Select>

                    <ErrorMassage error={errors.role_id?.message} />
                </Field>)
            }
        />
    </>
}

interface Props {
    control: Control<EmploySchemaType>;
}