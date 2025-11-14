"use client";

import { leadsQueryKey } from "@/api/hooks/use-leads.api";
import { deleteLeadFile } from "@/api/leads/delete-lead-file.api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useOpen } from "@/hooks/use-open";
import { useRouter } from "@/i18n/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteLeadFile = ({ id, leadId }: Props) => {
    const { open, onOpenChange } = useOpen();
    const [pending, startTransition] = useTransition();
    const queryClient = useQueryClient();
    const session = useSession();

    const handleRemove = () => {
        startTransition(async () => {
            const response = await deleteLeadFile({
                id,
                lead_id: leadId,
                token: session.data?.user.accessToken
            });

            if (!response.ok) {
                toast.error("Произошла ошибка");
                return;
            }

            toast.success("Файл удален");
            queryClient.invalidateQueries({
                queryKey: leadsQueryKey.files.getFiles(leadId),
            });
            onOpenChange(false);
        })
    }

    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <Trash2 className="hover:text-red-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Удаление файла
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Вы действительно хотите удалить файл?
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
    id: string;
    leadId: number;
}