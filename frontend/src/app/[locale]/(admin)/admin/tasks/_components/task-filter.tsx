"use client";

import { Input } from "@/components/ui/input";
import { SelectStatus } from "./select-status";
import { useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/search-params.util";
import { startTransition } from "react";
import { SelectUsers } from "./select-users";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const TaskFilter = () => {
    const [{ query }, setQuery] = useQueryStates(searchParamsParsers);

    const handleReset = () => {
        startTransition(() => {
            setQuery(
                {
                    query: null,
                    array: null,
                    users: null,
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

                <div className="flex gap-4">
                    <Input
                        className="w-96"
                        value={query ?? ""}
                        placeholder="Поиск задач..."
                        sizes="lg"
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
                        size="lg"
                        className="gap-2"
                        onClick={handleReset}
                    >
                        <X className="h-4 w-4" />
                        Сбросить
                    </Button>
                </div>
            </div>
        </section>


    );
};
