"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { searchParamsParsers } from "@/lib/search-params.util";
import { useQueryStates } from "nuqs"
import { useForm } from "react-hook-form";

export const ClientFilter = () => {
    const [{ query }] = useQueryStates(searchParamsParsers);

    const { register, control, handleSubmit } = useForm<FormFields>({
        defaultValues: {
            search: query
        },
    });

    const onSubmit = (data: FormFields) => {
        console.log(data);
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
        <Field>
            <FieldLabel htmlFor="search">
                Поиск
            </FieldLabel>

            <Input id="search" {...register("search")} />
        </Field>
    </form>
}

interface FormFields {
    search: string
}