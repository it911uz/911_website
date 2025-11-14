"use client";

import { useGetTags } from "@/api/hooks/use-tag.api";
import { MultiSelect } from "@/components/ui/multi-select";
import { useSession } from "next-auth/react";

export const SelectTags = ({ onValueChange, defaultValue }: Props) => {
    const session = useSession();

    const { data } = useGetTags({
        token: session.data?.user.accessToken,
    });

    return <MultiSelect
        items={data?.data.items?.map(item => ({ value: item.id.toString(), label: item.name })) ?? []}
        placeholder="Выберите статусы"
        onValueChange={onValueChange}
        defaultValue={defaultValue}
    />
};

interface Props {
    onValueChange(value: string[]): void;
    defaultValue?: string[]
}