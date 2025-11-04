"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useOpen } from "@/hooks/use-open";
import { Trash2 } from "lucide-react";

export const DeleteColumn = () => {
    const { open, onOpenChange } = useOpen();

    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <Trash2 className="hover:text-red-500 text-2xl cursor-pointer" onClick={() => onOpenChange(true)} />
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Удаление колонки
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Вы действительно хотите удалить колонку и все ее задачи?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel colors={"white"}>Отмена</AlertDialogCancel>
                <AlertDialogAction colors={"red"}>Удалить</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}