"use client";

import { useGetPermissions } from "@/api/hooks/use-permissions.api";
import { MultiSelect } from "@/components/ui/multi-select";
import { useSession } from "next-auth/react";

export const SelectPermissions = ({ onValueChange, defaultValue }: Props) => {

    const session = useSession();

    const { data } = useGetPermissions({
        token: session.data?.user.accessToken
    });

    return (
        <MultiSelect
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            items={data?.data?.map(item => ({ value: item.id.toString(), label: item.name })) ?? []}
            placeholder="Выберите права"
        />
    )
}

interface Props {
    onValueChange: (value: string[]) => void;
    defaultValue?: string[];
}