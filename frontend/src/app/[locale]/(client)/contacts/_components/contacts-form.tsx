"use client";

import { useForm } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactSchemaType } from "@/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { ErrorMassage } from "@/components/ui/error-message";
import { contactAction } from "@/actions/contact.action";
import { toast } from "sonner";

export const ContactsForm = () => {
    const [pending, startTransition] = useTransition();

    const { register, handleSubmit, formState: { errors, isDirty }, reset, } = useForm<ContactSchemaType>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = (values: ContactSchemaType) => {
        startTransition(async () => {
            const response = await contactAction({ body: values });

            if (!response.ok) {
                toast.error("Произошла ошибка");
                return;
            }

            toast.success("Сообщение отправлено");
            reset();
        })
    }

    return <form className="px-6 xl:px-24 space-y-8 md:space-y-10" onSubmit={handleSubmit(onSubmit)}>

        <h3 className="text-3xl md:text-5xl">
            Если у вас есть вопросы, свяжитесь с нами
        </h3>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="name">Ваше имя</FieldLabel>

            <Input border={false} type="text" id="name" placeholder="Введите полное имя" {...register("full_name")} />

            <ErrorMassage error={errors.full_name?.message} />
        </Field>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="phone">Введите полный номер телефона</FieldLabel>

            <Input border={false} type="text" id="phone" placeholder="Номер телефона" {...register("phone")} />

            <ErrorMassage error={errors.phone?.message} />
        </Field>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="email">Введите email</FieldLabel>

            <Input border={false} type="email" id="email" placeholder="Введите email" {...register("email")} />

            <ErrorMassage error={errors.email?.message} />
        </Field>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="company_name">Название компании</FieldLabel>

            <Input border={false} type="text" id="company_name" placeholder="Введите название компании" {...register("company_name")} />

            <ErrorMassage error={errors.company_name?.message} />
        </Field>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="company_info">Дополнительная информация</FieldLabel>

            <Textarea bordered={false} placeholder="Ваш вопрос" {...register("company_info")} />

            <ErrorMassage error={errors.company_info?.message} />
        </Field>

        <Button disabled={!isDirty} loading={pending} rounded={true} size={"lg"} className="font-black" variant={"red"}>
            Отправить
        </Button>
    </form>
}