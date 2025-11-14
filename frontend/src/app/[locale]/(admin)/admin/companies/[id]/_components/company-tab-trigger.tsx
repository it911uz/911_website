"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { searchParamsParsers } from "@/lib/search-params.util";
import { useQueryStates } from "nuqs";
import { startTransition } from "react";

export const CompanyTabTrigger = ({ value, label }: Props) => {
    const [_, setQuery] = useQueryStates(searchParamsParsers);

    const handleClick = () => {
        setQuery(
            {
                tab: value,
            },
            {
                startTransition,
            },
        );
    }

    return <TabsTrigger value={value} onClick={handleClick}>
        {label}
    </TabsTrigger>
};

interface Props {
    value: string;
    label: string;
}