"use client";

import { deleteCompanyComment } from "@/api/companies/delete-company-comment.api";
import { deleteCompanyContact } from "@/api/companies/delete-company-contact.api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useOpen } from "@/hooks/use-open";
import { useRouter } from "@/i18n/navigation";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import type { CompanyComment } from "@/types/company.type";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteComment = ({ comment }: Props) => {
    const { open, onOpenChange } = useOpen();
    const { id } = useParams<{ id: string }>();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const session = useSession();

    const handleRemove = () => {
        startTransition(async () => {
            console.log({
                id: comment.id,
                companyId: Number(id)
            });

            const response = await deleteCompanyComment({
                id: comment.id,
                token: session.data?.user.accessToken,
                companyId: Number(id)
            })

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Комментария удален");
            router.refresh();
            onOpenChange(false);
        })
    }

    const isExistDate = dayjs().diff(dayjs(comment.created_at), "hour") > 24;

    return !isExistDate ? (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <Trash2
                className="hover:text-red-500 text-2xl cursor-pointer"
                onClick={() => onOpenChange(true)}
            />

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Удалить комментарий</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы действительно хотите удалить комментарий?
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel colors="white">Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleRemove}
                        loading={pending}
                        colors="red"
                    >
                        Удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ) : null;
}

interface Props {
    comment: CompanyComment
}