"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Lead } from "@/types/leads.type";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const Issue = ({ issue }: Props) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: issue.id,
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

            )}
        >
            {/* TODO: Issue */}
        </Card>
    );
};

interface Props {
    issue: Issue;
}

interface Issue extends Lead {
    create_at: Date;
    update_at: Date;
}