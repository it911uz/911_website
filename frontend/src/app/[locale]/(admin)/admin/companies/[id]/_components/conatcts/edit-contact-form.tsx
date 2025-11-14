"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { companyContactSchema, type CompanyContactSchemaType } from "@/schemas/company.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import type { CompanyContact } from "@/types/company.type";
import { updateCompanyContact } from "@/api/companies/update-company-contact.api";

export const EditContactForm = ({ contact }: Props) => {
    const session = useSession();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors } } =
        useForm<CompanyContactSchemaType>({
            resolver: zodResolver(companyContactSchema),
            defaultValues: contact
        });

    const onSubmit = (values: CompanyContactSchemaType) => {
        startTransition(async () => {

            const response = await updateCompanyContact({
                token: session?.data?.user?.accessToken,
                body: values,
                id: contact.id,
                companyId: Number(id)
            });

            if (response.error) {
                toast.error(response.data.detail || "Что-то пошло не так");
                return;
            }

            toast.success("Добавлен контакт");
            router.refresh();
        });
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <FieldLabel className="text-lg" required htmlFor="full_name">
                    Полное название компании / контактного лица
                </FieldLabel>
                <Input
                    id="full_name"
                    type="text"
                    sizes="lg"
                    color="light"
                    placeholder="Введите полное название"
                    {...register("full_name")}
                />
                <ErrorMassage error={errors.full_name?.message} />
            </Field>

            <Field>
                <FieldLabel className="text-lg" required htmlFor="phone_number">
                    Номер телефона
                </FieldLabel>
                <Input
                    id="phone_number"
                    type="tel"
                    sizes="lg"
                    color="light"
                    placeholder="+998901234567"
                    {...register("phone_number")}
                />
                <ErrorMassage error={errors.phone_number?.message} />
            </Field>

            <Field>
                <FieldLabel className="text-lg" required htmlFor="email">
                    Электронная почта
                </FieldLabel>
                <Input
                    id="email"
                    type="email"
                    sizes="lg"
                    color="light"
                    placeholder="example@mail.com"
                    {...register("email")}
                />
                <ErrorMassage error={errors.email?.message} />
            </Field>

            <Field>
                <FieldLabel className="text-lg" required htmlFor="relation">
                    Связь с компанией / роль
                </FieldLabel>
                <Input
                    id="relation"
                    type="text"
                    sizes="lg"
                    color="light"
                    placeholder="Например: Директор, Менеджер, Представитель"
                    {...register("relation")}
                />
                <ErrorMassage error={errors.relation?.message} />
            </Field>

            <Button loading={pending} variant="black" size="lg" type="submit">
                Сохранить
            </Button>
        </form>
    );
};


interface Props {
    contact: CompanyContact;
}