"use client";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Column, type ColumnType } from "./column";
import { useOptimistic, useTransition } from "react";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const columns: ColumnType[] = [
    {
        columnId: 1,
        name: "Новые",
        hex: "#ff0000",
        issues: [
            {
                id: 1,
                full_name: "John Doe",
                email: "2H6Yh@example.com",
                phone: "+1234567890",
                status: "new",
                created_at: new Date("2023-01-01"),
                updated_at: new Date("2023-01-01"),
                company_info: "Company A",
                company_name: "Company A",
                target_id: "1",
            }
        ],
        position: 1
    },
    {
        columnId: 2,
        name: "Открытые",
        hex: "#00ff00",
        issues: [],
        position: 2
    },
    {
        columnId: 3,
        name: "Закрытые",
        hex: "#0000ff",
        issues: [],
        position: 3
    }
] as const;

export const Columns = () => {
    const [pending, startTransition] = useTransition();
    // dnd-kit setup
    const [optimisticColumns, setOptimisticColumns] = useOptimistic(
        columns.sort((a, b) => a.position - b.position),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) {
            return;
        }
        if (active.id !== over.id) {
            const oldIndex = optimisticColumns.findIndex(
                (section) => section.columnId === active.id,
            );
            const newIndex = optimisticColumns.findIndex(
                (section) => section.columnId === over.id,
            );

            const newSections = arrayMove(optimisticColumns, oldIndex, newIndex);
            startTransition(async () => {

                setOptimisticColumns(newSections);
                toast.success("Колонка перемещена");
                // send the new order to the server
            });
        }
    };

    return <section data-slot="columns" className={cn("py-10 px-4 lg:px-6", pending ? "pointer-events-none" : "")}>
        <div className={cn("flex gap-4 overflow-x-auto")}>
            <DndContext id="columns" onDragEnd={handleDragEnd}>
                <SortableContext items={optimisticColumns.map((section) => section.columnId)}
                    strategy={verticalListSortingStrategy}>
                    {
                        columns.map(column => (
                            <Column key={column.columnId} columnData={column} />
                        ))
                    }
                </SortableContext>
            </DndContext>
        </div>
    </section>
}