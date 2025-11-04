"use client";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState } from "react";
import { IssueOption } from "./issue-option";
import type { TaskType } from "./column";
import dayjs from "dayjs";
import { useSortable } from "@dnd-kit/sortable";

export const Issue = ({ issue }: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: issue.id,
    });

    const [showAll, setShowAll] = useState(false);

    const style: React.CSSProperties = {
        position: isDragging ? "relative" : "static",
        boxShadow: isDragging
            ? "0 12px 25px rgba(0,0,0,0.25)"
            : "0 2px 6px rgba(0,0,0,0.05)",
        scale: isDragging ? "1.03" : "1",
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 9999 : 1,
    };

    const deadlineDiff = dayjs().diff(dayjs(issue.deadline), "day");
    const isOverdue = deadlineDiff >= 1;

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={cn(
                "w-full rounded-xl border-l-4 py-4 transition-all duration-200 hover:shadow-lg",
                {
                    "bg-red-100 border-red-400": isOverdue,
                    "bg-white": !isOverdue,
                }
            )}
        >
            <CardHeader className="relative">
                <CardTitle className="text-base font-semibold">{issue.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                    Создано: {dayjs(issue.created_at).format("YYYY-MM-DD")}
                </CardDescription>
                <CardAction className="absolute top-2 right-2">
                    <GripVertical
                        className="cursor-grab text-gray-400 hover:text-gray-600"
                        {...listeners}
                    />
                </CardAction>
            </CardHeader>

            <CardContent
                onDoubleClick={() => setShowAll(!showAll)}
                className={cn("text-sm text-gray-700", {
                    "h-10 overflow-hidden cursor-pointer": issue.message.length > 60 && !showAll,
                    "h-auto cursor-text": showAll,
                })}
            >
                <p>{issue.message}</p>
            </CardContent>

            <CardFooter className="justify-between text-xs text-gray-500">
                <span>
                    Дедлайн:{" "}
                    <span
                        className={cn({
                            "text-red-600 font-medium": isOverdue,
                            "text-gray-700": !isOverdue,
                        })}
                    >
                        {dayjs(issue.deadline).format("YYYY-MM-DD")}
                    </span>
                </span>
                <IssueOption />
            </CardFooter>
        </Card>
    );
};

interface Props {
    issue: TaskType;
}
