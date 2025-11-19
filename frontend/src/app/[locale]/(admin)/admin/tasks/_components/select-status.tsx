"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react"
import { useGetTasksStatuses } from "@/api/hooks/use-tasks.api";

export const SelectStatus = ({ onValueChange }: Props) => {
    const session = useSession();
    const { data } = useGetTasksStatuses({
        token: session.data?.user.accessToken
    });

    return <Select onValueChange={onValueChange}>
        <SelectTrigger size="lg" className="w-72">
            <SelectValue placeholder="Выберите статус" />
        </SelectTrigger>
        <SelectContent>
            {
                (data?.data?.length ?? 0) ? data?.data.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                    </SelectItem>
                )) : <p>Статусов нет</p>
            }

        </SelectContent>
    </Select>
}

interface Props {
    onValueChange?(value: string): void
}