"use client";

import { deleteTask } from "@/api/tasks/delete-task.api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Routers } from "@/configs/router.config";
import { useOpen } from "@/hooks/use-open";
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteTask = ({ taskId }: Props) => {
    const { open, onOpenChange } = useOpen();

    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const session = useSession();

    const handleRemove = () => {
        startTransition(async () => {
            const response = await deleteTask({
                id: taskId,
                token: session.data?.user.accessToken
            });

            if (!response.ok) {
                toast.error(response.data.detail || "Произошла ошибка");
                return;
            }

            toast.success("Задача удалена");
            router.push(Routers.admin.tasks);
            onOpenChange(false);
        })
    }

    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <Button variant={"red"} onClick={() => onOpenChange(true)} >
            Удалить
        </Button>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Удалить задачу
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Вы действительно хотите удалить задачу
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
    taskId: number
}