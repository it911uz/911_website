"use client";

import { useGetTasksStatuses } from "@/api/hooks/use-tasks.api";
import type { OptionType } from "@/types/components.type";
import { useSession } from "next-auth/react";
import { useMemo, useCallback } from "react";
import Select, { type SingleValue, type ActionMeta } from "react-select";

export const SelectStatus = ({ onValueChange, defaultValue }: Props) => {
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

    const value = useMemo<OptionType | null>(() => {
        if (!defaultValue || !options.length) return null;

        return options.find(
            (option) => option.value === defaultValue
        ) ?? null;
    }, [defaultValue, options]);

    const handleChange = useCallback(
        (
            newValue: SingleValue<OptionType>,
            _: ActionMeta<OptionType>
        ) => {
            if (!newValue) return;
            onValueChange?.(newValue.value);
        },
        [onValueChange]
    );

    return (
        <Select<OptionType, false>
            isSearchable
            isClearable
            isLoading={isLoading}
            options={options}
            value={value}
            onChange={handleChange}
            placeholder="Выберите статус"
            noOptionsMessage={() => "Статусов нет"}
        />
    );
};

interface Props {
    onValueChange?(value: string): void;
    defaultValue?: string;
}