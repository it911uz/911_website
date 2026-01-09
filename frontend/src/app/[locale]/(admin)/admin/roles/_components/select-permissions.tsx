"use client";

import { useGetPermissions } from "@/api/hooks/use-permissions.api";
import Select, { type MultiValue, type ActionMeta } from 'react-select'
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import type { OptionType } from "@/types/components.type";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const SelectPermissions = ({ onValueChange, defaultValue }: Props) => {
    const session = useSession();
    const { data, isLoading } = useGetPermissions({
        token: session.data?.user.accessToken
    });

    const handleChange = (
        newValue: MultiValue<OptionType>,
        _: ActionMeta<OptionType>
    ) => {
        const values = newValue.map(item => item.value);
        onValueChange(values);
    };

    const allOptions = useMemo(() => {
        return data?.data?.map(item => ({
            value: item.id.toString(),
            label: item.name
        })) ?? [];
    }, [data?.data]);

    const value = useMemo(() => {
        if (!data?.data || !defaultValue) return [];

        return defaultValue.map(value => {
            const permission = data.data.find(item => item.id.toString() === value);
            return {
                value: value,
                label: permission?.name ?? value
            };
        }).filter(option => option.label !== "");
    }, [data?.data, defaultValue]);

    const handleSelectAll = () => {
        const allValues = allOptions.map(item => item.value);
        onValueChange(allValues);
    };

    return (
        <Field>
            <Label className="flex gap-5 items-center">
                <Checkbox
                    onCheckedChange={value => {
                        if (value) {
                            handleSelectAll();
                        } else {
                            onValueChange([]);
                        }

                    }}
                />

                <span>
                    Выбрать все права
                </span>
            </Label>

            <Select<OptionType, true>
                value={value}
                isSearchable={true}
                closeMenuOnSelect={false}
                onChange={handleChange}
                isMulti
                isLoading={isLoading}
                options={allOptions}
                placeholder="Выберите разрешения"
                noOptionsMessage={() => "Нет доступных разрешений"}
            />
        </Field>
    )
}

interface Props {
    onValueChange: (value: string[]) => void;
    defaultValue?: string[];
}