"use client"

import { useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CustomSunEditor } from "@/components/ui/editor"

import { useOpen } from "@/hooks/use-open"
import { leadSchema, type LeadSchemaType } from "@/schemas/lead.schema"
import { createLead } from "@/api/leads/create-lead.api"
import { toastErrorResponse } from "@/lib/toast-error-response.util"

export const CreateLead = () => {
    const { open, onOpenChange } = useOpen()
    const [pending, startTransition] = useTransition()

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<LeadSchemaType>({
        resolver: zodResolver(leadSchema),
    })

    const onSubmit = (values: LeadSchemaType) => {
        startTransition(async () => {
            const response = await createLead({ body: values })

            if (!response.ok) {
                toastErrorResponse(response.data)
                return
            }

            toast.success("Лид создан")
            reset()
            window.location.reload()
            onOpenChange(false)
        })
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <Button
                type="button"
                variant="black"
                size="md"
                className="text-lg"
                onClick={() => onOpenChange(true)}
            >
                <Plus />
                <span>Создать лид</span>
            </Button>

            <SheetContent className="w-full sm:max-w-2xl">
                <SheetHeader>
                    <SheetTitle>Создание лида</SheetTitle>
                </SheetHeader>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Field>
                        <FieldLabel required htmlFor="full_name">
                            Имя
                        </FieldLabel>

                        <Input id="full_name" color="light" {...register("full_name")} />

                        <FieldError errors={[errors.full_name]} />
                    </Field>

                    <Field>
                        <FieldLabel required htmlFor="phone">
                            Номер телефона
                        </FieldLabel>

                        <Input id="phone" type="tel" color="light" {...register("phone")} />

                        <FieldError errors={[errors.phone]} />
                    </Field>

                    <Field>
                        <FieldLabel required htmlFor="email">
                            Электронная почта
                        </FieldLabel>

                        <Input id="email" type="email" color="light" {...register("email")} />

                        <FieldError errors={[errors.email]} />
                    </Field>

                    <Field>
                        <FieldLabel required htmlFor="company_name">
                            Название организации
                        </FieldLabel>

                        <Input id="company_name" color="light" {...register("company_name")} />

                        <FieldError errors={[errors.company_name]} />
                    </Field>

                    <Controller
                        name="company_info"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel required>
                                    Описание организации
                                </FieldLabel>

                                <CustomSunEditor
                                    defaultValue={field.value}
                                    onChange={field.onChange}
                                />

                                <FieldError errors={[errors.company_info]} />
                            </Field>
                        )}
                    />

                    <Button
                        type="submit"
                        variant="black"
                        size="lg"
                        loading={pending}
                        disabled={pending}
                    >
                        Создать
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}
