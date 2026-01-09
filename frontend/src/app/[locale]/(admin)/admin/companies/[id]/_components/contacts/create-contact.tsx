"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { companyContactSchema, type CompanyContactSchemaType } from "@/schemas/company.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { createCompanyContact } from "@/api/companies/create-company-contact.api";
import { useParams } from "next/navigation";
import { toastErrorResponse } from "@/lib/toast-error-response.util";

export const CreateCompany = () => {
    const { open, onOpenChange } = useOpen();
    const session = useSession();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, reset, control } =
        useForm<CompanyContactSchemaType>({
            resolver: zodResolver(companyContactSchema),
        });

    const onSubmit = (values: CompanyContactSchemaType) => {
        startTransition(async () => {

            const response = await createCompanyContact({
                token: session?.data?.user?.accessToken,
                data: values,
                id: Number(id)
            });

            if (response.error) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Добавлен контакт");
            router.refresh();
            reset();
            onOpenChange(false);
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <Button
                className="text-lg"
                onClick={() => onOpenChange(true)}
                size="md"
                variant="black"
            >
                <Plus />
                <span>Добавить</span>
            </Button>

            <SheetContent className="w-2/5">
                <SheetHeader>
                    <SheetTitle>Добавить контакт</SheetTitle>
                </SheetHeader>

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
                        <FieldError errors={[errors.full_name]} />
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
                        <FieldError errors={[errors.phone_number]} />
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
                        <FieldError errors={[errors.email]} />
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
                        <FieldError errors={[errors.relation]} />
                    </Field>

                    <Button loading={pending} variant="black" size="lg" type="submit">
                        Сохранить
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};
