"use client";

import { deleteTaskComment } from "@/api/tasks/delete-task-comment.api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Routers } from "@/configs/router.config";
import { useOpen } from "@/hooks/use-open";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { TaskComment } from "@/types/tasks.type";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteTaskComment = ({ comment }: Props) => {
    const { open, onOpenChange } = useOpen();
    const { id } = useParams<{ id: string }>();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const session = useSession();

    const handleRemove = () => {
        startTransition(async () => {
            const response = await deleteTaskComment({
                commentId: comment.id,
                token: session.data?.user.accessToken,
                taskId: Number(id)
            });

            if (!response.ok) {
                toast.error(response.data.detail || "Произошла ошибка");
                return;
            }

            toast.success("Комментарии удалена");
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
    comment: TaskComment;
}