"use client";

import { Button } from "@/components/ui/button";
import { ErrorMassage } from "@/components/ui/error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOpen } from "@/hooks/use-open";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { roleSchema, type RoleSchemaType } from "@/schemas/role.schema";
import { useRouter } from "@/i18n/navigation";
import { createRole } from "@/api/roles/create-role.api";
import { useSession } from "next-auth/react";
import { companyCommentSchema, type CompanyCommentSchemaType } from "@/schemas/company.schema";
import { createCompanyComment } from "@/api/companies/create-company-comment.api";
import { useParams } from "next/navigation";
import { CustomSunEditor } from "@/components/ui/editor";
import { toastErrorResponse } from "@/lib/toast-error-response.util";

export const CreateComment = () => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<CompanyCommentSchemaType>({
        resolver: zodResolver(companyCommentSchema)
    });

    const session = useSession();

    const onSubmit = (values: CompanyCommentSchemaType) => {
        startTransition(async () => {

            const response = await createCompanyComment({
                body: values,
                token: session.data?.user.accessToken,
                companyId: Number(id)
            });

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Комментарий добавлен");
            router.refresh();
            reset();
            onOpenChange(false);
        })
    }

    return <Sheet open={open} onOpenChange={onOpenChange}>
        <Button className="text-lg" onClick={() => onOpenChange(true)} size={"md"} variant={"black"}>
            <Plus />

            <span>
                Добавить
            </span>
        </Button>

        <SheetContent className="w-xl">
            <SheetHeader>
                <SheetTitle>Создание роли</SheetTitle>
            </SheetHeader>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel className="text-lg" required htmlFor="info">
                                Описание компании
                            </FieldLabel>
                            <CustomSunEditor
                                defaultValue={field.value}
                                onChange={field.onChange}
                            />
                            <ErrorMassage error={errors.comment?.message} />
                        </Field>
                    )}
                />

                <Button loading={pending} type="submit" size={"lg"} variant={"black"}>Создать</Button>
            </form>
        </SheetContent>
    </Sheet>
};