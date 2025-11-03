"use client";

import { DndContext, DragOverlay, type DragEndEvent, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useOptimistic, useTransition, useState } from "react";
import { cn } from "@/lib/utils";
import { Column, type ColumnType } from "./column";
import { Issue } from "./issue";

export const Columns = () => {
    const [pending, startTransition] = useTransition();
    const [activeItem, setActiveItem] = useState<any>(null);

    const [optimisticColumns, setOptimisticColumns] = useOptimistic(
        initialColumns.sort((a, b) => a.position - b.position)
    );

    const findColumnContainer = (id: number | string) => {
        const numericId = Number(id);
        return (
            optimisticColumns.find((col) => col.issues.some((issue) => issue.id === numericId)) ??
            optimisticColumns.find((col) => col.columnId === numericId) ??
            null
        );
    };

    const handleDragStart = (event: any) => {
        const { active } = event;
        const activeId = Number(active.id);

        const activeColumn = optimisticColumns.find((col) => col.columnId === activeId);
        if (activeColumn) {
            setActiveItem({ type: "column", data: activeColumn });
            return;
        }

        const activeCol = findColumnContainer(activeId);
        const activeIssue = activeCol?.issues.find((i) => i.id === activeId);
        if (activeIssue) {
            setActiveItem({ type: "issue", data: activeIssue });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveItem(null);
        if (!over) return;

        const activeId = Number(active.id);
        const overId = Number(over.id);

        const isDraggingColumn = optimisticColumns.some((col) => col.columnId === activeId);
        if (isDraggingColumn) {
            const oldIndex = optimisticColumns.findIndex((col) => col.columnId === activeId);
            const newIndex = optimisticColumns.findIndex((col) => col.columnId === overId);
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
            const oldIndex = activeCol.issues.findIndex((i) => i.id === activeId);
            const newIndex = overCol.issues.findIndex((i) => i.id === overId);
            const updatedIssues = arrayMove(activeCol.issues, oldIndex, newIndex);
            startTransition(() =>
                setOptimisticColumns((cols) =>
                    cols.map((c) =>
                        c.columnId === activeCol.columnId ? { ...c, issues: updatedIssues } : c
                    )
                )
            );
        } else {
            const activeIssue = activeCol.issues.find((i) => i.id === activeId);
            if (!activeIssue) return;

            startTransition(() =>
                setOptimisticColumns((cols) =>
                    cols.map((c) => {
                        if (c.columnId === activeCol.columnId) {
                            return { ...c, issues: c.issues.filter((i) => i.id !== activeId) };
                        }
                        if (c.columnId === overCol.columnId) {
                            return { ...c, issues: [...c.issues, { ...activeIssue, status: c.columnId }] };
                        }
                        return c;
                    })
                )
            );
        }
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
                    <SortableContext items={optimisticColumns.map((col) => col.columnId)}>
                        {optimisticColumns.map((column) => (
                            <SortableContext
                                key={column.columnId}
                                id={column.columnId.toString()}
                                items={column.issues.map((i) => i.id)}
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
                    {activeItem?.type === "issue" && (
                        <div className="opacity-80 scale-[1.02]">
                            <Issue issue={activeItem.data} />
                        </div>
                    )}
                </DragOverlay>
            </DndContext>
        </section>
    );
};


const initialColumns: ColumnType[] = [
    {
        columnId: 1,
        name: "Новые задачи",
        hex: "#ff4d4d",
        position: 1,
        issues: [
            {
                id: 10,
                position: 1,
                created_at: new Date("2025-10-20"),
                updated_at: new Date("2025-10-21"),
                deadline: new Date("2025-11-05"),
                status: 1,
                files: [],
                tags: [
                    { id: 1, name: "frontend" },
                    { id: 2, name: "UI" },
                ],
                comments: "Нужно продумать адаптивность и hover-состояния.",
                message: "Сверстать лендинг для нового продукта.",
                name: "Верстка лендинга продукта",
                executors: [{ id: 1, full_name: "John Doe" }],
            },
            {
                id: 20,
                position: 2,
                created_at: new Date("2025-10-22"),
                updated_at: new Date("2025-10-23"),
                deadline: new Date("2025-11-03"),
                status: 1,
                files: [],
                tags: [
                    { id: 3, name: "api" },
                    { id: 4, name: "backend" },
                ],
                comments: "Проверить корректность всех эндпоинтов.",
                message: "Разработать REST API для заказов.",
                name: "API заказов",
                executors: [],
            },
            {
                id: 30,
                position: 3,
                created_at: new Date("2025-10-15"),
                updated_at: new Date("2025-10-18"),
                deadline: new Date("2025-10-31"),
                status: 1,
                files: [],
                tags: [{ id: 5, name: "design" }],
                comments: "Прототип устарел, нужно обновить.",
                message: "Переработать дизайн формы регистрации.",
                name: "Редизайн формы регистрации",
                executors: [{ id: 2, full_name: "Alice Cooper" }],
            },
        ],
    },
    {
        columnId: 2,
        name: "В работе",
        hex: "#f5a623",
        position: 2,
        issues: [
            {
                id: 40,
                position: 1,
                created_at: new Date("2025-10-18"),
                updated_at: new Date("2025-11-02"),
                deadline: new Date("2025-11-10"),
                status: 2,
                files: [],
                tags: [{ id: 6, name: "optimization" }],
                comments: "Нужно ускорить загрузку списка заказов.",
                message: "Оптимизировать компонент отображения заказов.",
                name: "Оптимизация списка заказов",
                executors: [{ id: 3, full_name: "Bob Smith" }],
            },
            {
                id: 50,
                position: 2,
                created_at: new Date("2025-10-10"),
                updated_at: new Date("2025-10-28"),
                deadline: new Date("2025-11-01"),
                status: 2,
                files: [],
                tags: [{ id: 7, name: "bugfix" }],
                comments: "Ошибка при валидации email-адресов.",
                message: "Исправить баг с валидацией email.",
                name: "Баг: неверная валидация email",
                executors: [{ id: 4, full_name: "Clara Miles" }],
            },
        ],
    },
    {
        columnId: 3,
        name: "На проверке",
        hex: "#0070f3",
        position: 3,
        issues: [
            {
                id: 60,
                position: 1,
                created_at: new Date("2025-10-25"),
                updated_at: new Date("2025-11-02"),
                deadline: new Date("2025-11-04"),
                status: 3,
                files: [],
                tags: [
                    { id: 8, name: "review" },
                    { id: 9, name: "frontend" },
                ],
                comments: "Проверить плавность анимаций.",
                message: "Добавить переходы между экранами.",
                name: "Проверка анимаций UI",
                executors: [{ id: 5, full_name: "Eva Johnson" }],
            },
        ],
    },
    {
        columnId: 4,
        name: "Надо доработать",
        hex: "#b9770e",
        position: 4,
        issues: [
            {
                id: 70,
                position: 1,
                created_at: new Date("2025-10-15"),
                updated_at: new Date("2025-10-30"),
                deadline: new Date("2025-10-28"),
                status: 4,
                files: [],
                tags: [{ id: 10, name: "UI" }],
                comments: "Не совпадает отступ в карточках.",
                message: "Исправить отступы в карточках задач.",
                name: "Исправление UI отступов",
                executors: [{ id: 6, full_name: "David Kim" }],
            },
            {
                id: 80,
                position: 2,
                created_at: new Date("2025-11-01"),
                updated_at: new Date("2025-11-02"),
                deadline: new Date("2025-11-09"),
                status: 4,
                files: [],
                tags: [{ id: 11, name: "refactor" }],
                comments: "Упростить структуру компонентов.",
                message: "Рефакторинг кода дашборда.",
                name: "Рефакторинг дашборда",
                executors: [],
            },
        ],
    },
    {
        columnId: 5,
        name: "Завершённые",
        hex: "#2ecc71",
        position: 5,
        issues: [
            {
                id: 90,
                position: 1,
                created_at: new Date("2025-09-20"),
                updated_at: new Date("2025-10-01"),
                deadline: new Date("2025-09-30"),
                status: 5,
                files: [],
                tags: [{ id: 12, name: "done" }],
                comments: "Успешно внедрено и протестировано.",
                message: "Добавить поддержку тёмной темы.",
                name: "Тёмная тема",
                executors: [{ id: 7, full_name: "Michael Chen" }],
            },
        ],
    },
];
