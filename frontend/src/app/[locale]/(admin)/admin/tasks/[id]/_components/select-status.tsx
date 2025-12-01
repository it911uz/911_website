"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react"
import { useGetTasksStatuses } from "@/api/hooks/use-tasks.api";

export const SelectStatus = ({ value, onValueChange }: Props) => {
    const session = useSession();
    const { data } = useGetTasksStatuses({
        token: session.data?.user.accessToken
    });

    return (
        <Select value={value?.toString()} onValueChange={onValueChange}>
            <SelectTrigger size="lg" className="w-full">
                <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>

            <SelectContent>
                {data?.data?.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

interface Props {
    value?: number | string;
    onValueChange(value: string): void;
}
