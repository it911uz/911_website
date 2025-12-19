"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { useOpen } from "@/hooks/use-open"
import { columnSchema, type ColumnSchemaType } from "@/schemas/lead.schema"
import { createLeadStatus } from "@/api/leads/create-lead-status.api"
import { toastErrorResponse } from "@/lib/toast-error-response.util"

export const CreateColumn = () => {
    const { open, onOpenChange } = useOpen()
    const { data: session } = useSession()
    const [pending, startTransition] = useTransition()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ColumnSchemaType>({
        resolver: zodResolver(columnSchema),
        defaultValues: { hex: "#000000" },
    })

    const onSubmit = (values: ColumnSchemaType) => {
        if (!session?.user.accessToken) return

        startTransition(async () => {
            const response = await createLeadStatus({
                body: values,
                token: session.user.accessToken,
            })

            if (!response.ok) {
                toastErrorResponse(response.data)
                return
            }

            toast.success("Колонка создана")
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
                <span>Добавить колонку</span>
            </Button>

            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Добавить колонку</SheetTitle>
                </SheetHeader>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Field>
                        <FieldLabel required htmlFor="name">
                            Название
                        </FieldLabel>

                        <Input id="name" color="light" {...register("name")} />

                        <FieldError errors={[errors.name]} />
                    </Field>

                    <Field>
                        <FieldLabel required htmlFor="hex">
                            Цвет
                        </FieldLabel>

                        <Input id="hex" type="color" color="light" className="h-12 p-1" {...register("hex")} />

                        <FieldError errors={[errors.hex]} />
                    </Field>

                    <Button
                        type="submit"
                        variant="black"
                        size="lg"
                        loading={pending}
                        disabled={pending}
                    >
                        Сохранить
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}
