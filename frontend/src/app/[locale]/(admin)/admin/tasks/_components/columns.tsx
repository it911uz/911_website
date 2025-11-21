"use client";

import { DndContext, DragOverlay, type DragEndEvent, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useOptimistic, useTransition, useState } from "react";
import { cn } from "@/lib/utils";
import { TaskCard } from "./task-card";
import { Column } from "./column";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import type { Task } from "@/types/tasks.type";
import { editTaskStatusPosition } from "@/api/tasks/edit-task-status-position.api";
import { editTaskPosition } from "@/api/tasks/edit-task-position.api";

export const Columns = ({ columnsData = [] }: Props) => {
    const [pending, startTransition] = useTransition();
    const [activeItem, setActiveItem] = useState<{ type: "column" | "task"; data: any } | null>(null);
    const session = useSession();
    const router = useRouter();
    const [optimisticColumns, setOptimisticColumns] = useOptimistic<ColumnType[]>(columnsData);

    const findColumnContainer = (id: string): ColumnType | null => {
        const isLead = id.startsWith("task-");
        const isContainer = id.startsWith("tasks-container-");
        const numericId = Number(id.replace(/\D+/g, ""));
        if (isLead) {
            return optimisticColumns.find((col) => col.tasks.some((lead) => lead.id === numericId)) ?? null;
        }
        if (isContainer) {
            return optimisticColumns.find((col) => col.columnId === numericId) ?? null;
        }
        return optimisticColumns.find((col) => col.columnId === numericId) ?? null;
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

        if (id.startsWith("task-")) {
            const numericId = Number(id.replace("task-", ""));
            const activeCol = findColumnContainer(id);
            const activeLead = activeCol?.tasks.find((i) => i.id === numericId);
            if (activeLead) setActiveItem({ type: "task", data: activeLead });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveItem(null);
        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        const activeNumeric = Number(activeId.replace(/\D+/g, ""));
        let overNumeric = Number(overId.replace(/\D+/g, ""));

        if (activeId.startsWith("column-") && (overId.startsWith("task-") || overId.startsWith("tasks-container-"))) {
            const overCol = findColumnContainer(overId);
            if (overCol) overNumeric = overCol.columnId;
        }

        if (activeId.startsWith("column-")) {
            const oldIndex = optimisticColumns.findIndex((column) => column.columnId === activeNumeric);
            const newIndex = optimisticColumns.findIndex((column) => column.columnId === overNumeric);

            if (oldIndex === -1 || newIndex === -1) return;

            const newColumns = arrayMove(optimisticColumns, oldIndex, newIndex);
            const body = newColumns.map((item, index) => ({ ...item, position: index + 1 }));

            startTransition(async () => {
                const column = body.find((item) => item.columnId === activeNumeric);
                if (!column) return;

                const response = await editTaskStatusPosition({
                    token: session.data?.user?.accessToken,
                    body: {
                        status_id: column.columnId,
                        new_position: column.position
                    }
                })

                if (!response.ok) {
                    toast.error(response.data.detail || "Не удалось переместить колонку");
                    return;
                }

                toast.success("Колонка перемещена");
                setOptimisticColumns(body);
                router.refresh();
            });

            return;
        }

        const activeCol = findColumnContainer(activeId);
        const overCol = findColumnContainer(overId);

        if (!activeCol || !overCol) return;

        const activeNumericId = Number(activeId.replace(/\D+/g, ""));
        const overNumericId = Number(overId.replace(/\D+/g, ""));

        const oldIndex = activeCol.tasks.findIndex((i) => i.id === activeNumericId);
        const newIndex = overCol.tasks.findIndex((i) => i.id === overNumericId);

        if (activeCol.columnId !== overCol.columnId) {
            const activeLead = activeCol.tasks[oldIndex];
            if (!activeLead) return;

            const updatedSource = activeCol.tasks.filter((i) => i.id !== activeNumericId);
            const updatedTarget = [...overCol.tasks];
            const insertAt = newIndex >= 0 ? newIndex : updatedTarget.length;

            updatedTarget.splice(insertAt, 0, {
                ...activeLead,
                status: overCol.columnId,
                position: activeLead.position ?? insertAt + 1,
            });


            const newColumns = optimisticColumns.map((column) => {
                if (column.columnId === activeCol.columnId) {
                    return { ...column, leads: updatedSource };
                }
                if (column.columnId === overCol.columnId) {
                    return { ...column, leads: updatedTarget };
                }
                return column;
            })

            startTransition(async () => {
                setOptimisticColumns(newColumns);

                const response = await editTaskPosition({
                    token: session.data?.user.accessToken,
                    body: {
                        task_id: activeLead.id,
                        status_id: overCol.columnId,
                    },
                });

                if (!response.ok) {
                    console.log(response);

                    toast.error("Не удалось переместить таск");
                    return;
                }

                toast.success("Таск перемещен");
                router.refresh();
            });

            return;
        }

        const newLeads = arrayMove(activeCol.tasks, oldIndex, newIndex);

        setOptimisticColumns((columns) =>
            columns.map((column) => {
                if (column.columnId === activeCol.columnId) {
                    return { ...column, leads: newLeads };
                }
                return column;
            })
        );

        startTransition(async () => {
            const response = await editTaskPosition({
                token: session.data?.user.accessToken,
                body: {
                    task_id: activeCol.tasks[oldIndex]?.id || 0,
                    status_id: activeCol.columnId,
                },
            });

            if (!response.ok) {
                toast.error("Не удалось обновить позицию таска");
                return;
            }

            router.refresh();
        });
    };

    return (
        <section className={cn("px-4 lg:px-6 grid grid-cols-1", { "pointer-events-none opacity-50": pending })}>
            <DndContext id="columns" onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <div className="w-full h-[80vh] overflow-y-scroll overflow-x-hidden">
                    <div className={cn("grid overflow-x-auto gap-5")} style={{ gridTemplateColumns: `repeat(${optimisticColumns.length}, 1fr)` }}>
                        <SortableContext items={optimisticColumns.map((col) => `column-${col.columnId}`)}>
                            {optimisticColumns.map((column) => (
                                <SortableContext key={column.columnId} id={`column-${column.columnId}`} items={column.tasks.map((i) => `task-${i.id}`)}>
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
                    {activeItem?.type === "task" && (
                        <div className="opacity-80 scale-[1.02]">
                            <TaskCard task={activeItem.data} />
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

export interface LeadType extends Omit<Task, "status" | "status_id"> {
    status: number;
    position: number;
}

export interface ColumnType {
    columnId: number;
    name: string;
    position: number;
    isCompleted: boolean;
    tasks: LeadType[];
    hex: string;
}
