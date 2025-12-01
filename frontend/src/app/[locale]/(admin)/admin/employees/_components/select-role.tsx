"use client";

import { useGetRoles } from "@/api/hooks/use-roles.api";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import Select from 'react-select'
import type { EmploySchemaType } from "@/schemas/employ.schema";
import { useSession } from "next-auth/react";
import { Controller, type Control } from "react-hook-form";

export const SelectRole = ({ control }: Props) => {
    const session = useSession();
    const { data } = useGetRoles({
        token: session.data?.user?.accessToken
    });

    const options = data?.data.items?.map(item => ({
        value: item.id,
        label: item.name
    })) ?? [];

    return (
        <Controller
            control={control}
            name="role_id"
            render={({ field, formState: { errors } }) => (
                <Field>
                    <FieldLabel className="text-lg" required htmlFor="role">
                        Роль
                    </FieldLabel>

                    <Select
                        value={options.find(option => option.value === field.value)}
                        isSearchable={true}
                        onChange={(selectedOption: any) => {
                            field.onChange(selectedOption?.value || null);
                        }}
                        options={options}
                        placeholder="Выберите роль"
                    />

                    <ErrorMassage error={errors.role_id?.message} />
                </Field>
            )}
        />
    );
}

interface Props {
    control: Control<EmploySchemaType>;
}