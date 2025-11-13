"use client";

import { useGetRoles } from "@/api/hooks/use-roles.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PreviewPage } from "@/const/preview-page.const";
import { searchParamsParsers } from "@/lib/search-params.util";
import { useSession } from "next-auth/react";
import { useQueryStates } from "nuqs";
import { useTransition } from "react";

export const EmployeesFilter = () => {
    const [pending, startTransition] = useTransition();
    const [{ query, perPage, userRole }, setQuery] = useQueryStates(searchParamsParsers);

    const session = useSession();

    const { data } = useGetRoles({
        token: session.data?.user?.accessToken
    });


    const handleClear = () => {
        startTransition(() => {
            setQuery({
                query: null,
                page: 1,
                perPage: 10,
                userRole: null
            }, {
                startTransition
            });
        })
    }

    return <section data-slot="filter" className="px-4 py-10 lg:px-8">
        <div className="flex gap-5">
            <Input
                value={query}
                onChange={(e) => setQuery({ query: e.target.value }, { startTransition })}
                type="search"
                placeholder="Поиск по названию"
                color="light"
                className="w-72"
            />

            <Select
                value={`${userRole ?? ""}`}
                onValueChange={(value) => setQuery({ userRole: Number(value) }, { startTransition })}
            >
                <SelectTrigger size={"lg"} className="w-72">
                    <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                    {
                        data?.data.items?.length ? data?.data.items?.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {item.name}
                            </SelectItem>
                        )) : <p>Ролей нет</p>
                    }
                </SelectContent>
            </Select>

            <Select
                value={perPage.toString()}
                onValueChange={(value) => setQuery({ perPage: Number(value) }, { startTransition })}
            >
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