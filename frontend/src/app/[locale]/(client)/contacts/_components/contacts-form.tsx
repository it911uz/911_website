"use client";

import { useForm } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { leadSchema, type LeadSchemaType } from "@/schemas/lead.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { ErrorMassage } from "@/components/ui/error-message";
import { contactAction } from "@/actions/contact.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const ContactsForm = () => {
    const t = useTranslations("ContactsPage.Form");
    const [pending, startTransition] = useTransition();

    const { register, handleSubmit, formState: { errors, isDirty }, reset, } = useForm<LeadSchemaType>({
        resolver: zodResolver(leadSchema)
    });

    const onSubmit = (values: LeadSchemaType) => {
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

        <h2 className="text-3xl md:text-5xl">
            {t("title")}
        </h2>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="name">
                {t("name")}
            </FieldLabel>

            <Input border={false} type="text" id="name" placeholder={t("namePlaceholder")} {...register("full_name")} />

            <ErrorMassage error={errors.full_name?.message} />
        </Field>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="phone">
                {t("phone")}
            </FieldLabel>

            <Input border={false} type="text" id="phone" placeholder={t("phonePlaceholder")} {...register("phone")} />

            <ErrorMassage error={errors.phone?.message} />
        </Field>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="email">
                {t("email")}
            </FieldLabel>

            <Input border={false} type="email" id="email" placeholder={t("emailPlaceholder")} {...register("email")} />

            <ErrorMassage error={errors.email?.message} />
        </Field>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="company_name">
                {t("organizationName")}
            </FieldLabel>

            <Input border={false} type="text" id="company_name" placeholder={t("organizationNamePlaceholder")} {...register("company_name")} />

            <ErrorMassage error={errors.company_name?.message} />
        </Field>

        <Field>
            <FieldLabel className="text-base md:text-xl text-white" required htmlFor="company_info">
                {t("organizationInfo")}
            </FieldLabel>

            <Textarea bordered={false} placeholder={t("organizationInfoPlaceholder")} {...register("company_info")} />

            <ErrorMassage error={errors.company_info?.message} />
        </Field>

        <Button disabled={!isDirty} loading={pending} rounded={true} size={"lg"} className="font-black" variant={"red"}>
            {t("submit")}
        </Button>
    </form>
}