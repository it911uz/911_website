"use client"

import { useGetLeadStatuses } from "@/api/hooks/use-leads.api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react"
import { useTransition } from "react";
import type { LeadType } from "./columns";
import { editLeadPosition } from "@/api/leads/edit-lead-position";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

export const SelectStatus = ({ lead }: Props) => {
    const session = useSession();
    const [pending, startTransition] = useTransition();
    const { data } = useGetLeadStatuses({
        token: session.data?.user.accessToken
    });
    const router = useRouter();

    const onChanger = (value: number) => {
        startTransition(async () => {

            const response = await editLeadPosition({
                token: session.data?.user.accessToken,
                body: {
                    lead_id: lead.id,
                    status_id: value,
                },
            });

            if (!response.ok) {
                toast.error("Произошла ошибка");
                return;
            }

            toast.success("Изменен статус");
            router.refresh();
        });
    }

    return <Select onValueChange={(value) => onChanger(Number(value))} defaultValue={lead.status.toString()}>
        <SelectTrigger disabled={pending} className="w-72">
            <SelectValue placeholder="Выберите статус" />
        </SelectTrigger>
        <SelectContent>
            {
                data?.data.items.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                    </SelectItem>
                ))
            }

        </SelectContent>
    </Select>
}

interface Props {
    lead: LeadType;
}