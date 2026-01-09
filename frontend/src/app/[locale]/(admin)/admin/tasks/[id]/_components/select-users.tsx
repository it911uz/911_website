"use client";

import { useGetUsers } from "@/api/hooks/use-users.api";
import type { OptionType } from "@/types/components.type";
import { useSession } from "next-auth/react";
import { useMemo, useCallback } from "react";
import Select, { type MultiValue, type ActionMeta } from "react-select";

interface Props {
    onValueChange(value: string[]): void;
    defaultValue?: string[];
}

export const SelectUsers = ({ onValueChange, defaultValue }: Props) => {
    const session = useSession();

    const { data, isLoading } = useGetUsers({
        token: session.data?.user.accessToken,
    });

    const options = useMemo<OptionType[]>(() => {
        return (
            data?.data.items?.map((item) => ({
                value: item.id.toString(),
                label: item.full_name,
            })) ?? []
        );
    }, [data?.data.items]);

    const value = useMemo<OptionType[]>(() => {
        if (!defaultValue?.length || !options.length) return [];

        return options.filter((option) =>
            defaultValue.includes(option.value)
        );
    }, [defaultValue, options]);

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
            value={value}
            onChange={handleChange}
            placeholder="Выберите исполнителей"
            noOptionsMessage={() => "Нет доступных пользователей"}
            className="z-10"
        />
    );
};
