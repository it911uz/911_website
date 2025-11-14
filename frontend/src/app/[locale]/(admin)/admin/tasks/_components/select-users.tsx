"use client";

import { useGetUsers } from "@/api/hooks/use-users.api";
import { MultiSelect } from "@/components/ui/multi-select";
import { useSession } from "next-auth/react";

export const SelectUsers = ({ onValueChange, defaultValue }: Props) => {
    const session = useSession();

    const { data } = useGetUsers({
        token: session.data?.user.accessToken,
    });

    return <MultiSelect
        items={data?.data.items?.map(item => ({ value: item.id.toString(), label: item.full_name })) ?? []}
        placeholder="Выберите исполнителей"
        onValueChange={onValueChange}
        defaultValue={defaultValue}
    />
};

interface Props {
    onValueChange(value: string[]): void;
    defaultValue?: string[]
}