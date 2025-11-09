"use client";

import { DndContext, DragOverlay, type DragEndEvent, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useOptimistic, useTransition, useState } from "react";
import { cn } from "@/lib/utils";
import { LeadCard } from "./lead-card";
import { Column } from "./column";
import { useSession } from "next-auth/react";
import { editLeadStatusPosition } from "@/api/leads/edit-lead-status-position.api";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { editLeadPosition } from "@/api/leads/edit-lead-position";

export const Columns = ({ columnsData = [] }: Props) => {

    const [pending, startTransition] = useTransition();
    const [activeItem, setActiveItem] = useState<{ type: "column" | "lead"; data: any } | null>(null);
    const session = useSession();
    const router = useRouter();
    const [optimisticColumns, setOptimisticColumns] = useState<ColumnType[]>(
        columnsData.sort((a, b) => a.position - b.position)
    );

    const findColumnContainer = (id: string): ColumnType | null => {
        const isLead = id.startsWith("lead-");
        const numericId = Number(id.replace(/\D+/g, ""));
        return (
            optimisticColumns.find((col) =>
                isLead ? col.leads.some((lead) => lead.id === numericId) : col.columnId === numericId
            ) ?? null
        );
    };

    const handleDragStart = (event: any) => {
        const { active } = event;
        const id = String(active.id);

        if (id.startsWith("column-")) {
            const numericId = Number(id.replace("column-", ""));
            const activeColumn = optimisticColumns.find((col) => col.columnId === numericId);
            if (activeColumn) setActiveItem({ type: "column", data: activeColumn });
            return;
        }

        if (id.startsWith("lead-")) {
            const numericId = Number(id.replace("lead-", ""));
            const activeCol = findColumnContainer(id);
            const activeLead = activeCol?.leads.find((i) => i.id === numericId);
            if (activeLead) setActiveItem({ type: "lead", data: activeLead });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveItem(null);
        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        const activeNumeric = Number(activeId.replace(/\D+/g, ""));
        const overNumeric = Number(overId.replace(/\D+/g, ""));

        if (activeId.startsWith("column-")) {
            const oldIndex = optimisticColumns.findIndex(
                (column) => column.columnId === activeNumeric,
            );

            const newIndex = optimisticColumns.findIndex(
                (column) => column.columnId === overNumeric,
            );

            const newColumns = arrayMove(optimisticColumns, oldIndex, newIndex);

            const body = newColumns.map((item, index) => ({
                ...item,
                position: index + 1
            }));

            startTransition(async () => {

                const column = body.find((item) => item.columnId === activeNumeric);

                if (!column) {
                    toast.warning("Не удалось переместить колонку");
                    return
                }

                const response = await editLeadStatusPosition({
                    token: session.data?.user.accessToken,
                    body: {
                        status_id: column.columnId,
                        new_position: column.position,
                    }
                });

                if (!response.ok) {
                    toast.error("Не удалось переместить колонку");
                    return;
                }

                toast.success("Колонка перемещена");
                setOptimisticColumns(body);
                router.refresh();
            });
        }
    };

    return (
        <section
            className={cn(
                "px-4 lg:px-6 grid grid-cols-1",
                {
                    "pointer-events-none opacity-50": pending,
                }
            )}
        >
            <DndContext
                id="columns"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
            >
                <div className="w-full overflow-hidden">
                    <div className={cn("grid overflow-x-auto gap-5 ")} style={{
                        gridTemplateColumns: `repeat(${optimisticColumns.length}, 1fr)`,
                    }}>
                        <SortableContext items={optimisticColumns.map((col) => `column-${col.columnId}`)}>
                            {optimisticColumns.map((column) => (
                                <SortableContext
                                    key={column.columnId}
                                    id={`column-${column.columnId}`}
                                    items={column.leads.map((i) => `lead-${i.id}`)}
                                >
                                    <Column key={column.columnId} columnData={column} />
                                </SortableContext>
                            ))}
                        </SortableContext>
                    </div>
                </div>

                <DragOverlay>
                    {activeItem?.type === "column" && (
                        <div className="opacity-80 scale-[1.02]">
                            <Column columnData={activeItem.data} />
                        </div>
                    )}
                    {activeItem?.type === "lead" && (
                        <div className="opacity-80 scale-[1.02]">
                            <LeadCard lead={activeItem.data} />
                        </div>
                    )}
                </DragOverlay>
            </DndContext>
        </section>
    );
};

interface Props {
    columnsData: ColumnType[];
}

export interface LeadType {
    id: number;
    full_name: string;
    company_name: string;
    company_info: string;
    phone: string;
    email: string;
    status: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface ColumnType {
    columnId: number;
    name: string;
    hex: string;
    position: number;
    leads: LeadType[];
}
