"use client";

import { DndContext, DragOverlay, type DragEndEvent, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useOptimistic, useTransition, useState } from "react";
import { cn } from "@/lib/utils";
import { LeadCard } from "./lead-card";
import { Column } from "./column";
import { useSession } from "next-auth/react";
import { editLeadColumnPosition } from "@/api/leads/edit-lead-column-position.api";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { editLeadPosition } from "@/api/leads/edit-lead-position";

export const Columns = ({ columnsData = [] }: Props) => {

    const [pending, startTransition] = useTransition();
    const [activeItem, setActiveItem] = useState<{ type: "column" | "lead"; data: any } | null>(null);
    const session = useSession();
    const router = useRouter();
    const [optimisticColumns, setOptimisticColumns] = useOptimistic<ColumnType[]>(
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

        const isDraggingColumn = activeId.startsWith("column-");

        if (isDraggingColumn) {
            const oldIndex = optimisticColumns.findIndex((col) => col.columnId === activeNumeric);
            const newIndex = optimisticColumns.findIndex((col) => col.columnId === overNumeric);
            if (oldIndex !== newIndex) {
                const newColumns = arrayMove(optimisticColumns, oldIndex, newIndex);
                startTransition(async () => {
                    setOptimisticColumns(newColumns);
                    const newPositionColumn = newColumns.map((item, index) => ({ ...item, position: index + 1 })).find((item) => item.columnId === activeNumeric);

                    const response = await editLeadColumnPosition({
                        token: session.data?.user.accessToken,
                        body: {
                            status_id: newPositionColumn?.columnId ?? 0,
                            new_position: newPositionColumn?.position ?? 0,
                        }
                    });

                    if (!response.ok) {
                        toast.error("Произошла ошибка");
                        return
                    }

                    toast.success("Колонка перемещена");
                    router.refresh();
                });
            }
            return;
        }

        const activeCol = findColumnContainer(activeId);
        const overCol = findColumnContainer(overId);

        if (!activeCol || !overCol) return;

        if (overCol.columnId) {
            const oldIndex = activeCol.leads.findIndex((i) => i.id === activeNumeric);
            const newIndex = overCol.leads.findIndex((i) => i.id === overNumeric);
            const updatedLeads = arrayMove(activeCol.leads, oldIndex, newIndex);
            startTransition(async () => {
                const id = String(active.id);

                if (id.startsWith("lead-")) {
                    const numericId = Number(id.replace("lead-", ""));

                    const activeLead = activeCol?.leads.find((i) => i.id === numericId);
                    if (activeLead) {
                        setActiveItem({ type: "lead", data: activeLead });

                        const response = await editLeadPosition({
                            token: session.data?.user.accessToken,
                            body: {
                                status_id: overCol.columnId,
                                lead_id: activeLead?.id ?? 0,
                            }
                        });

                        if (!response.ok) {
                            toast.error("Произошла ошибка");
                            return
                        }

                        toast.success("Лид перемещен");
                        router.refresh();
                    }
                }
            });

            return;
        }

        const activeLead = activeCol.leads.find((i) => i.id === activeNumeric);
        if (!activeLead) return;

        startTransition(() =>
            setOptimisticColumns((cols) =>
                cols.map((c) => {
                    if (c.columnId === activeCol.columnId) {
                        return { ...c, leads: c.leads.filter((i) => i.id !== activeNumeric) };
                    }
                    if (c.columnId === overCol.columnId) {
                        return { ...c, leads: [...c.leads, { ...activeLead, status: c.columnId }] };
                    }
                    return c;
                })
            )
        );
    };

    return (
        <section
            className={cn("py-10 px-4 lg:px-6 overflow-x-auto overflow-y-hidden", {
                "pointer-events-none opacity-50": pending,
            })}
        >
            <DndContext
                id="columns"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
            >
                <div className="flex gap-6 min-w-max">
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
