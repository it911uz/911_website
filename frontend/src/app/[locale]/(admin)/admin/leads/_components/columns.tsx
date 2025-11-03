"use client";

import { DndContext, DragOverlay, type DragEndEvent, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useOptimistic, useTransition, useState } from "react";
import { cn } from "@/lib/utils";
import { LeadCard } from "./lead-card";
import { Column } from "./column";

export const Columns = () => {
    const [pending, startTransition] = useTransition();
    const [activeItem, setActiveItem] = useState<{ type: "column" | "lead"; data: any } | null>(null);

    const [optimisticColumns, setOptimisticColumns] = useOptimistic<ColumnType[]>(
        initialColumns.sort((a, b) => a.position - b.position)
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
                startTransition(() => setOptimisticColumns(newColumns));
            }
            return;
        }

        const activeCol = findColumnContainer(activeId);
        const overCol = findColumnContainer(overId);
        if (!activeCol || !overCol) return;
        
        if (activeCol.columnId === overCol.columnId) {
            const oldIndex = activeCol.leads.findIndex((i) => i.id === activeNumeric);
            const newIndex = overCol.leads.findIndex((i) => i.id === overNumeric);
            const updatedLeads = arrayMove(activeCol.leads, oldIndex, newIndex);
            startTransition(() =>
                setOptimisticColumns((cols) =>
                    cols.map((c) =>
                        c.columnId === activeCol.columnId ? { ...c, leads: updatedLeads } : c
                    )
                )
            );
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

// ------------------- Типы -------------------
export interface LeadType {
    id: number;
    full_name: string;
    company_name: string;
    company_info: string;
    phone: string;
    email: string;
    status: number;
    created_at: Date;
    updated_at: Date;
}

export interface ColumnType {
    columnId: number;
    name: string;
    hex: string;
    position: number;
    leads: LeadType[];
}

// ------------------- Пример данных -------------------
const initialColumns: ColumnType[] = [
    {
        columnId: 1,
        name: "Новые лиды",
        hex: "#ff4d4d",
        position: 1,
        leads: [
            {
                id: 1,
                full_name: "Иван Иванов",
                company_name: "TechCorp",
                company_info: "Интересуется разработкой корпоративного сайта.",
                phone: "+998 90 111 22 33",
                email: "ivan@techcorp.uz",
                status: 1,
                created_at: new Date("2025-11-01"),
                updated_at: new Date("2025-11-02"),
            },
            {
                id: 2,
                full_name: "Анна Смирнова",
                company_name: "SoftLine",
                company_info: "Хотят заказать мобильное приложение.",
                phone: "+998 91 444 55 66",
                email: "anna@softline.uz",
                status: 1,
                created_at: new Date("2025-10-28"),
                updated_at: new Date("2025-10-29"),
            },
        ],
    },
    {
        columnId: 2,
        name: "В работе",
        hex: "#f5a623",
        position: 2,
        leads: [
            {
                id: 3,
                full_name: "Петр Петров",
                company_name: "WebArt",
                company_info: "Проектирование дизайна платформы.",
                phone: "+998 93 123 45 67",
                email: "petr@webart.uz",
                status: 2,
                created_at: new Date("2025-10-25"),
                updated_at: new Date("2025-10-28"),
            },
        ],
    },
    {
        columnId: 3,
        name: "Заключение договора",
        hex: "#0070f3",
        position: 3,
        leads: [
            {
                id: 4,
                full_name: "Мария Ким",
                company_name: "VisionPro",
                company_info: "Подписан договор, ожидается аванс.",
                phone: "+998 95 777 88 99",
                email: "maria@visionpro.uz",
                status: 3,
                created_at: new Date("2025-10-20"),
                updated_at: new Date("2025-10-23"),
            },
        ],
    },
    {
        columnId: 4,
        name: "Закрытые сделки",
        hex: "#2ecc71",
        position: 4,
        leads: [],
    },
];
