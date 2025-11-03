"use client"

import * as React from "react"; // Используем React явно
import { useState, type ComponentProps } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button"; // Используем стандартный Button
import { Card, } from "@/components/ui/card"; // Используем стандартный Card
import { MessageCircle, RefreshCcw, XCircle } from "lucide-react"; // Заменил IoIosChatbubbles на MessageCircle
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    useDroppable,
    useDraggable,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";

const bgClasses: Record<string, string> = {
    red: "bg-red-500/10 border-red-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
    green: "bg-green-500/10 border-green-500/20",
};

const headingClasses: Record<string, string> = {
    red: "text-red-600",
    purple: "text-purple-600",
    green: "text-green-600",
};

const borderClasses: Record<string, string> = {
    red: "border-red-400 hover:border-red-500",
    purple: "border-purple-400 hover:border-purple-500",
    green: "border-green-400 hover:border-green-500",
};

type ColumnStatus = {
    status: "new" | "open" | "closed";
};
type ColumnType = {
    title: string;
    id: ColumnStatus["status"];
    issues: IssueType[];
    bg_color: keyof typeof bgClasses;
};
type IssueType = {
    id: string;
    title: string;
    customer_name: string;
    customer_email?: string;
    content?: string;
    attachmentURL?: string;
    messages?: Message[];
    date: string;
    status: ColumnStatus["status"];
};
interface Message {
    id: string;
}

// ... (default lists - newIssuesList, openIssuesList, closedIssuesList, findAndRemoveIssue - остаются без изменений)

//👇🏻 default list of new issues
export const newIssuesList: IssueType[] = [
    {
        id: "1",
        customer_name: "David",
        title: "How can I access my account?",
        date: "25th December, 2025",
        status: "new",
    },
];

//👇🏻 default list of open issues
export const openIssuesList: IssueType[] = [
    {
        id: "2",
        customer_name: "David",
        title: "My password is not working and I need it fixed ASAP",
        date: "20th July, 2023",
        status: "open",
    },
    {
        id: "3",
        customer_name: "David",
        title: "First Issues",
        date: "5th February, 2023",
        status: "open",
    },
    {
        id: "4",
        customer_name: "David",
        title: "First Issues",
        date: "2nd March, 2023",
        status: "open",
    },
    {
        id: "5",
        customer_name: "David",
        title:
            "What is wrong with your network? I can't access my profile settings account",
        date: "5th August, 2024",
        status: "open",
    },
];

//👇🏻 default list of closed issues
export const closedIssuesList: IssueType[] = [
    {
        id: "6",
        customer_name: "David",
        title: "First Issues",
        date: "2nd March, 2023",
        status: "closed",
    },
    {
        id: "7",
        customer_name: "Jeremiah Chibuike",
        title:
            "What is wrong with your network? I can't access my profile settings account",
        date: "5th August, 2024",
        status: "closed",
    },
    {
        id: "8",
        customer_name: "David",
        title: "First Issues",
        date: "2nd March, 2023",
        status: "closed",
    },
    {
        id: "9",
        customer_name: "David",
        title:
            "What is wrong with your network? I can't access my profile settings account",
        date: "5th August, 2024",
        status: "closed",
    },
    {
        id: "10",
        customer_name: "David",
        title:
            "What is wrong with your network? I can't access my profile settings account",
        date: "5th August, 2024",
        status: "closed",
    },
];

//👇🏻 Helper function to find and remove an issue from a list
export const findAndRemoveIssue = (
    issues: IssueType[],
    setIssues: React.Dispatch<React.SetStateAction<IssueType[]>>,
    currentIssueId: string
): IssueType | null => {
    const issueIndex = issues.findIndex((issue) => issue.id === currentIssueId);
    if (issueIndex === -1) return null; //👈🏼 Not found

    const [removedIssue] = issues.splice(issueIndex, 1);
    setIssues([...issues]); //👈🏼 Update state after removal
    return removedIssue as IssueType | null;
};
// --- END: Stubbed/Helper Data and Types ---


// --- Main Component ---
export const LeadsTable = () => {
    const [newIssues, setNewIssues] = useState<IssueType[]>(newIssuesList);
    const [openIssues, setOpenIssues] = useState<IssueType[]>(openIssuesList);
    const [closedIssues, setClosedIssues] =
        useState<IssueType[]>(closedIssuesList);

    // DND-kit sensors (Logic is preserved)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
        const issueId = active.id as string;
        const newStatus = over.id as ColumnStatus["status"];

        let movedIssue: IssueType | null = null;

        //👇🏻 Find and remove the issue from its current state
        // [{id: 1, status: "new"}, {id: 2, status: "new"}, {id: 3, status: "open"}]
        movedIssue =
            movedIssue ||
            findAndRemoveIssue(newIssues, setNewIssues, issueId) ||
            findAndRemoveIssue(openIssues, setOpenIssues, issueId) ||
            findAndRemoveIssue(closedIssues, setClosedIssues, issueId);

        if (movedIssue) {
            movedIssue.status = newStatus; // 👈🏼 Update the status of the issue
            if (newStatus === "new") {
                setNewIssues((prev) => [...prev, movedIssue]);
            } else if (newStatus === "open") {
                setOpenIssues((prev) => [...prev, movedIssue]);
            } else if (newStatus === "closed") {
                setClosedIssues((prev) => [...prev, movedIssue]);
            }
        }
    };

    return (
        <section
            data-slot="table-container"
            className="p-4 lg:p-6 transition-all bg-muted/30" // Более современный фон
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <div
                    className='w-full h-full min-h-[calc(100vh-10rem)] flex flex-col lg:flex-row items-start lg:space-x-4 space-y-4 lg:space-y-0' // Улучшенная высота и отступы
                >
                    <Column
                        bg_color='red'
                        id='new'
                        title={`Новые (${newIssues.length})`}
                        issues={newIssues}
                    />

                    <Column
                        bg_color='purple'
                        id='open'
                        title={`В работе (${openIssues.length})`}
                        issues={openIssues}
                    />

                    <Column
                        bg_color='green'
                        id='closed'
                        title={`Закрытые (${closedIssues.length})`}
                        issues={closedIssues}
                    />
                </div>
            </DndContext>
        </section>
    );
}

// --- Column Component (Стилистика Kanban-столбца) ---
const Column = ({ title, id, bg_color, issues }: ColumnType) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "lg:w-1/3 w-full p-4 min-h-[50vh] rounded-xl border-2 shadow-lg transition-all duration-200",
                bgClasses[bg_color],
                isOver ? "scale-[1.02] border-dashed border-4 border-primary/60 bg-primary/5" : ""
            )}
            key={id}
        >
            <header className='flex items-center justify-between mb-4'>
                <h2
                    className={cn(
                        "font-bold text-xl",
                        headingClasses[bg_color]
                    )}
                >
                    {title}
                </h2>
                {issues?.length > 4 && (
                    <Button
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Показать все
                    </Button>
                )}
            </header>

            <div className='flex flex-col items-center space-y-3 overflow-x-hidden overflow-y-auto max-h-[calc(100vh-18rem)]'>
                {issues?.map((item) => (
                    <IssueCard
                        item={item}
                        key={item.id}
                        bg_color={bg_color}
                        columnId={id}
                    />
                ))}
            </div>
        </div>
    );
};

// --- IssueCard Component (Карточка с эффектом поднятия при drag) ---
const IssueCard = ({
    item,
    bg_color,
    columnId,
}: {
    item: IssueType;
    bg_color: ColumnType["bg_color"];
    columnId: ColumnStatus["status"];
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
    });

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 9999 : 1,
        position: isDragging ? "relative" : "static",
        boxShadow: isDragging
            ? "0 12px 25px rgba(0,0,0,0.25)"
            : "0 2px 6px rgba(0,0,0,0.05)",
        scale: isDragging ? "1.03" : "1",
        transition: "all 0.15s ease",
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cn(
                "w-full cursor-grab rounded-xl border-l-4 p-4 transition-all duration-200 bg-white hover:shadow-lg active:cursor-grabbing",
                borderClasses[bg_color]
            )}
        >
            <h3 className='font-semibold text-base mb-2 text-foreground opacity-90'>
                {item.title}
            </h3>

            <p className='text-xs text-muted-foreground mb-1'>Создан: {item.date}</p>
            <p className='text-xs text-muted-foreground mb-3'>
                Клиент: {item.customer_name}
            </p>

            <section className='flex items-center justify-end space-x-2 border-t pt-3'>
                <Button variant="black" size="sm" className="h-7 text-sm">
                    Чат <MessageCircle className='ml-2 size-4' />
                </Button>

                {columnId !== "closed" ? (
                    <Button variant="red" size="sm" className="h-7 text-sm">
                        Закрыть <XCircle className='ml-2 size-4' />
                    </Button>
                ) : (
                    <Button variant="white" size="sm" className="h-7 text-sm">
                        Открыть снова <RefreshCcw className='ml-2 size-3.5' />
                    </Button>
                )}
            </section>
        </Card>
    );
};

// Exporting types and helpers (Unchanged logic)
export type { ColumnStatus, ColumnType, IssueType, Message };