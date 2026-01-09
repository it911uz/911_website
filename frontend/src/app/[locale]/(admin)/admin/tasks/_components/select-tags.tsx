"use client";

import { useGetTags } from "@/api/hooks/use-tag.api";
import type { OptionType } from "@/types/components.type";
import { useSession } from "next-auth/react";
import { useMemo, useCallback } from "react";
import Select, { type MultiValue, type ActionMeta } from "react-select";

export const SelectTags = ({ onValueChange, defaultValue }: Props) => {
    const session = useSession();

    const { data, isLoading } = useGetTags({
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

    const value = useMemo<OptionType[]>(() => {
        if (!defaultValue?.length || !options.length) return [];

        return options.filter((option) =>
            defaultValue.includes(option.value)
        );
    }, [defaultValue, options]);

    const handleChange = useCallback(
        (newValue: MultiValue<OptionType>, _: ActionMeta<OptionType>) => {
            onValueChange(newValue.map((item) => item.value));
        },
        [onValueChange]
    );

    return (
        <Select<OptionType, true>
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            isLoading={isLoading}
            options={options}
            value={value}
            onChange={handleChange}
            placeholder="Выберите теги"
            noOptionsMessage={() => "Нет доступных тегов"}
        />
    );
};

interface Props {
    onValueChange(value: string[]): void;
    defaultValue?: string[];
}