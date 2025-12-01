"use client";

import { deleteCompanyContact } from "@/api/companies/delete-company-contact.api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useOpen } from "@/hooks/use-open";
import { useRouter } from "@/i18n/navigation";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteContact = ({ contactId }: Props) => {
    const { open, onOpenChange } = useOpen();
    const { id } = useParams<{ id: string }>();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const session = useSession();

    const handleRemove = () => {
        startTransition(async () => {
            const response = await deleteCompanyContact({
                id: contactId,
                token: session.data?.user.accessToken,
                companyId: Number(id)
            })

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Контакт удален");
            router.refresh();
            onOpenChange(false);
        })
    }

    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <Trash2 className="hover:text-red-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Удалить контакт
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Вы уверены, что хотите удалить контакт?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel colors={"white"}>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemove} loading={pending} colors={"red"}>Удалить</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}

interface Props {
    contactId: number
}