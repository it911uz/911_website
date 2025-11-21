"use client";

import { useGetTags } from "@/api/hooks/use-tag.api";
import { MultiSelect } from "@/components/ui/multi-select";
import { useSession } from "next-auth/react";

export const SelectTags = ({ onValueChange, value }: Props) => {
    const session = useSession();

    const { data } = useGetTags({
        token: session.data?.user.accessToken,
    });

    return (
        <MultiSelect
            items={data?.data?.map(item => ({ value: item.id.toString(), label: item.name })) ?? []}
            placeholder="Выберите теги"
            defaultValue={value?.map(String)}
            onValueChange={(arr) => onValueChange(arr.map(String))}
        />
    );
};

interface Props {
    onValueChange(value: string[]): void;
    value?: number[];
}