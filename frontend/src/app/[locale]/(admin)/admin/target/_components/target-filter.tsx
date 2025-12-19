"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PreviewPage } from "@/const/preview-page.const";
import { searchParamsParsers } from "@/lib/search-params.util";
import { useQueryStates } from "nuqs";
import { useTransition } from "react";

export const TargetFilter = () => {
    const [pending, startTransition] = useTransition();
    const [{ query, perPage, isActive }, setQuery] = useQueryStates(searchParamsParsers);

    const handleClear = () => {
        startTransition(() => {
            setQuery({
                query: null,
                page: 1,
                perPage: 10,
                isActive: true
            }, {
                startTransition
            });
        })
    }

    return <section data-slot="filter" className="px-4 pb-10 lg:px-8">
        <p className="text-lg font-bold mb-5">Фильтр таргет</p>
        <div className="flex gap-5">
            <Input value={query} onChange={(e) => setQuery({ query: e.target.value }, { startTransition })} type="search" placeholder="Поиск по названию" color="light" className="w-72" />

            <Select value={`${isActive}`} onValueChange={(value) => setQuery({ isActive: value === "true" }, { startTransition })}>
                <SelectTrigger size={"lg"} className="w-72">
                    <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"true"}>
                        Активные
                    </SelectItem>

                    <SelectItem value={"false"}>
                        Неактивные
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select value={perPage.toString()} onValueChange={(value) => setQuery({ perPage: Number(value) }, { startTransition })}>
                <SelectTrigger size={"lg"} className="w-72">
                    <SelectValue placeholder="Выберите кол-во просмотров" />
                </SelectTrigger>
                <SelectContent>
                    {
                        PreviewPage.map((item) => (
                            <SelectItem key={item.id} value={item.value.toString()}>
                                {item.label}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            <Button disabled={pending} onClick={handleClear} size={"lg"}>
                Сбросить
            </Button>
        </div>
    </section>
}