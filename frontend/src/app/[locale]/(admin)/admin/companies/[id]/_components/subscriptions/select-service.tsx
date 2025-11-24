"use client"

import { useGetServices } from "@/api/hooks/user-services.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Service } from "@/types/service.type";
import { useSession } from "next-auth/react";

export const SelectService = ({ onValueChange, value }: Props) => {
    const session = useSession();
    const { data } = useGetServices({
        token: session.data?.user.accessToken
    });

    const services = data?.data ?? [];

    return (
        <Select
            onValueChange={(id) => {
                const service = services.find((s) => s.id === Number(id));
                if (service && onValueChange) onValueChange(service);
            }}
            defaultValue={value}
        >
            <SelectTrigger className="w-full" size="lg">
                <SelectValue placeholder="Выберите услугу" />
            </SelectTrigger>

            <SelectContent>
                {services.length > 0 ? (
                    services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name}
                        </SelectItem>
                    ))
                ) : (
                    <p className="px-2 py-1 text-sm text-muted-foreground">Услуг нет</p>
                )}
            </SelectContent>
        </Select>
    );
};

interface Props {
    value?: string;
    onValueChange?: (value: Service) => void;
}
