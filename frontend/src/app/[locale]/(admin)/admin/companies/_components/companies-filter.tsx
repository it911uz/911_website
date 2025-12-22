"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { PreviewPage } from "@/const/preview-page.const";
import { searchParamsParsers } from "@/lib/search-params.util";
import { useQueryStates } from "nuqs";
import { useTransition } from "react";

export const CompaniesFilter = () => {
    const [pending, startTransition] = useTransition();
    const [{ query, perPage, status }, setQuery] =
        useQueryStates(searchParamsParsers);

    const handleClear = () => {
        startTransition(() => {
            setQuery(
                {
                    query: null,
                    page: 1,
                    perPage: 10,
                    status: null
                },
                { startTransition }
            );
        });
    };

    return (
        <section data-slot="filter" className="px-4 lg:px-8">
            <div className="mb-4">
                <p className="text-lg font-bold">
                    Фильтр компаний
                </p>
            </div>

            <div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end lg:gap-5"
            >
                <Input
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            { query: e.target.value },
                            { startTransition }
                        )
                    }
                    type="search"
                    placeholder="Поиск по названию"
                    aria-label="Поиск по названию компании"
                    color="light"
                    className="w-full lg:w-72"
                />

                <Select
                    value={status ?? ""}
                    onValueChange={(value) =>
                        setQuery({ status: value }, { startTransition })
                    }
                >
                    <SelectTrigger
                        size="lg"
                        className="w-full lg:w-72"
                    >
                        <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="active">
                            Активные
                        </SelectItem>
                        <SelectItem value="inactive">
                            Неактивные
                        </SelectItem>
                        <SelectItem value="pending">
                            В ожидании
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={perPage.toString()}
                    onValueChange={(value) =>
                        setQuery(
                            { perPage: Number(value) },
                            { startTransition }
                        )
                    }
                >
                    <SelectTrigger
                        size="lg"
                        className="w-full lg:w-72"
                    >
                        <SelectValue placeholder="Кол-во записей" />
                    </SelectTrigger>

                    <SelectContent>
                        {PreviewPage.map((item) => (
                            <SelectItem
                                key={item.id}
                                value={item.value.toString()}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    disabled={pending}
                    onClick={handleClear}
                    size="lg"
                    className="w-full sm:col-span-2 lg:w-auto"
                >
                    Сбросить
                </Button>
            </div>
        </section>
    );
};
