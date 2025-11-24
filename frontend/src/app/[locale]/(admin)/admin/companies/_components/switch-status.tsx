"use client";

import { createCompanyComment } from "@/api/companies/create-company-comment.api";
import { updateCompany } from "@/api/companies/update-company.api";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { CustomSunEditor } from "@/components/ui/editor";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useRouter } from "@/i18n/navigation";
import { toastErrorResponse } from "@/lib/toast-error-response.util";
import type { Company } from "@/types/company.type";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const SwitchStatus = ({ companyData }: Props) => {
    const [company, setCompany] = useState(companyData);
    const [selectedStatus, setSelectedStatus] = useState(companyData.status);
    const [previousStatus, setPreviousStatus] = useState(companyData.status);
    const [comment, setComment] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [pending, startTransition] = useTransition();

    const session = useSession();
    const router = useRouter();

    const companyUpdate = async (status: string) => {
        const response = await updateCompany({
            body: { ...company, status },
            token: session.data?.user.accessToken,
            id: company.id
        });

        if (!response.ok) {
            toastErrorResponse(response.data)
            return;
        }

        toast.success("Статус изменён");
        router.refresh();
    };

    const handleSelect = (value: string) => {
        setPreviousStatus(company.status);
        setSelectedStatus(value);

        if (value === "inactive") {
            setOpenModal(true);
            return;
        }

        setCompany((prev) => ({ ...prev, status: value }));
        companyUpdate(value);
    };

    const confirmInactive = () => {
        startTransition(async () => {
            const response = await createCompanyComment({
                token: session.data?.user.accessToken,
                body: {
                    comment
                },
                companyId: company.id
            })

            if (!response.ok) {
                toastErrorResponse(response.data)
                return;
            }

            setCompany((prev) => ({ ...prev, status: "inactive" }));
            await companyUpdate("inactive");
            setOpenModal(false);
        });
    };

    const cancelInactive = () => {
        setSelectedStatus(previousStatus);
        setOpenModal(false);
    };

    return (
        <>
            <Select
                disabled={pending}
                value={selectedStatus}
                onValueChange={handleSelect}
            >
                <SelectTrigger size="lg" className="w-72">
                    <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="inactive">Неактивные</SelectItem>
                    <SelectItem value="pending">В ожидании</SelectItem>
                </SelectContent>
            </Select>

            <AlertDialog open={openModal} onOpenChange={setOpenModal}>
                <AlertDialogContent className="sm:max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Изменить статус на неактивный?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Вы действительно хотите перевести компанию в статус "Неактивные"?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <CustomSunEditor
                        defaultValue={comment}
                        onChange={setComment}
                    />

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancelInactive} colors="white">
                            Отмена
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={confirmInactive}
                            loading={pending}
                            colors="red"
                        >
                            Подтвердить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

interface Props {
    companyData: Company;
}
