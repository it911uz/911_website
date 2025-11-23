"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { searchParamsParsers } from "@/lib/search-params.util";
import { PAYMENT_TYPES } from "@/schemas/company.schema";
import { useQueryStates } from "nuqs";
import { useTransition } from "react";
import { SelectService } from "./select-service";
import { Field, FieldLabel } from "@/components/ui/field";

export const SubscriptionsFilter = () => {
    const [pending, startTransition] = useTransition();
    const [{ type, fromDate, toDate, targetId }, setQuery] = useQueryStates(searchParamsParsers);

    const handleClear = () => {
        startTransition(() => {
            setQuery({
                type: null,
                fromDate: null,
                toDate: null,
                targetId: null
            }, {
                startTransition
            });
        })
    }

    return <div className="flex gap-5 items-end" data-slot="filter">
        <Field>
            <FieldLabel>
                <span>Тип оплаты</span>
            </FieldLabel>
            <Select value={type ?? ""} onValueChange={(value) => setQuery({ type: value }, { startTransition })}>
                <SelectTrigger size={"lg"} className="w-72">
                    <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                    {
                        PAYMENT_TYPES.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </Field>

        <Field>
            <FieldLabel>
                <span>Сервис</span>
            </FieldLabel>

            <SelectService value={targetId ?? ""} onValueChange={(value) => setQuery({ targetId: value?.id.toString() }, { startTransition })} />
        </Field>

        <Field>
            <FieldLabel>
                <span>Дата создания</span>
            </FieldLabel>
            <Input color="light" defaultValue={fromDate?.toISOString().split("T")[0]} type="date" onChange={(e) => setQuery({ fromDate: new Date(e.target.value) }, { startTransition })} sizes="lg" />
        </Field>

        <Field>
            <FieldLabel>
                <span>Дата создания</span>
            </FieldLabel>
            <Input color="light" defaultValue={toDate?.toISOString().split("T")[0]} type="date" onChange={(e) => setQuery({ toDate: new Date(e.target.value) }, { startTransition })} sizes="lg" />
        </Field>

        <Button disabled={pending} onClick={handleClear} size={"lg"}>
            Сбросить
        </Button>
    </div>
}