"use client";

import { useGetTags } from "@/api/hooks/use-tag.api";
import type { OptionType } from "@/types/components.type";
import { useSession } from "next-auth/react";
import { useMemo, useCallback } from "react";
import Select, { type MultiValue, type ActionMeta } from "react-select";

interface Props {
    onValueChange(value: string[]): void;
    value?: number[];
}

export const SelectTags = ({ onValueChange, value }: Props) => {
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

    const selectedValues = useMemo<OptionType[]>(() => {
        if (!value?.length || !options.length) return [];

        return options.filter((option) =>
            value.includes(Number(option.value))
        );
    }, [value, options]);

    const handleChange = useCallback(
        (
            newValue: MultiValue<OptionType>,
            _: ActionMeta<OptionType>
        ) => {
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
            value={selectedValues}
            onChange={handleChange}
            placeholder="Выберите теги"
            noOptionsMessage={() => "Нет доступных тегов"}
        />
    );
};
