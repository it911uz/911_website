"use client";

import { useGetTasksStatuses } from "@/api/hooks/use-tasks.api";
import type { OptionType } from "@/types/components.type";
import { useSession } from "next-auth/react";
import { useMemo, useCallback } from "react";
import Select, { type SingleValue, type ActionMeta } from "react-select";

interface Props {
    value?: number | string;
    onValueChange(value: string): void;
}

export const SelectStatus = ({ value, onValueChange }: Props) => {
    const session = useSession();

    const { data, isLoading } = useGetTasksStatuses({
        token: session.data?.user.accessToken,
    });

    const options = useMemo<OptionType[]>(() => {
        return (
            data?.data?.map((item) => ({
                value: item.id.toString(),
                label: item.name,
            })) ?? []
        );
    }, [data?.data]);

    const selectedValue = useMemo<OptionType | null>(() => {
        if (!value || !options.length) return null;

        return (
            options.find(
                (option) => option.value === value.toString()
            ) ?? null
        );
    }, [value, options]);

    const handleChange = useCallback(
        (
            newValue: SingleValue<OptionType>,
            _: ActionMeta<OptionType>
        ) => {
            if (!newValue) return;
            onValueChange(newValue.value);
        },
        [onValueChange]
    );

    return (
        <Select<OptionType, false>
            isSearchable
            isClearable={false}
            isLoading={isLoading}
            options={options}
            value={selectedValue}
            onChange={handleChange}
            placeholder="Выберите статус"
            noOptionsMessage={() => "Статусов нет"}
        />
    );
};
