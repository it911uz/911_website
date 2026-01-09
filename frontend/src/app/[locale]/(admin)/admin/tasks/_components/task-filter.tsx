"use client";

import { Input } from "@/components/ui/input";
import { SelectStatus } from "./select-status";
import { useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/search-params.util";
import { startTransition } from "react";
import { SelectUsers } from "./select-users";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SelectTags } from "./select-tags";

export const TaskFilter = () => {
    const [{ query, array, users, tags }, setQuery] = useQueryStates(searchParamsParsers);

    const handleReset = () => {
        startTransition(() => {
            setQuery(
                {
                    query: null,
                    array: null,
                    users: null,
                    tags: null
                },
                { startTransition }
            );
        });
    };

    return (
        <section
            data-slot="filter"
            className="px-4 pb-10 lg:px-8"
        >
            <div className="rounded-xl space-y-4">
                <h3 className="text-lg font-semibold">Фильтр задач</h3>

                <div className="flex items-center gap-4">
                    <Input
                        className="w-96 shadow-none"
                        value={query ?? ""}
                        placeholder="Поиск задач..."
                        sizes={"md"}
                        color="light"
                        onChange={(e) =>
                            setQuery(
                                { query: e.target.value || null },
                                { startTransition }
                            )
                        }
                    />

                    <SelectStatus
                        onValueChange={(value) => {
                            setQuery(
                                { array: [Number(value)] },
                                { startTransition }
                            );
                        }}
                        defaultValue={array?.[0]?.toString() ?? ""}
                    />

                    <SelectTags
                        defaultValue={tags?.map(String)}
                        onValueChange={(values) => {
                            setQuery(
                                {
                                    tags: values.map(Number),
                                },
                                { startTransition }
                            );
                        }}
                    />

                    <SelectUsers
                        onValueChange={(value) => {
                            setQuery(
                                { users: value.map(Number) },
                                { startTransition }
                            );
                        }}
                    />

                    <Button
                        className="gap-2 h-10"
                        onClick={handleReset}
                    >
                        <X className="h-4 w-4" />

                        <span>Сбросить</span>
                    </Button>
                </div>
            </div>
        </section>


    );
};
