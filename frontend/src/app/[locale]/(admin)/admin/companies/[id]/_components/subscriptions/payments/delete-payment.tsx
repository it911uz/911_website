"use client";

import { deleteCompanyPayment } from "@/api/companies/delete-company-payment.api";
import { deleteCompanySubscription } from "@/api/companies/delete-company-subscription.api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useOpen } from "@/hooks/use-open";
import { useRouter } from "@/i18n/navigation";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeletePayment = ({ id, subscriptionId }: Props) => {
    const { open, onOpenChange } = useOpen();
    const { id: companyId } = useParams<{ id: string }>();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const session = useSession();

    const handleRemove = () => {
        startTransition(async () => {
            const response = await deleteCompanyPayment({
                token: session.data?.user.accessToken,
                companyId: Number(companyId),
                id,
                subscriptionId
            })

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            toast.success("Платеж удален");
            router.refresh();
            onOpenChange(false);
        })
    }

    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <Trash2 className="hover:text-red-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Удаление платежа
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Вы действительно хотите удалить платеж?
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
    id: number;
    subscriptionId: number
}