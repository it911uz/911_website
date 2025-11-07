"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { LeadType } from "./columns";
import { LeadOption } from "./lead-option";
import dayjs from "dayjs";

export const LeadCard = ({ lead }: Props) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: `lead-${lead.id}`,
    });

    const [showAll, setShowAll] = useState(false);

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 9999 : 1,
        boxShadow: isDragging ? "0 10px 20px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.05)",
        scale: isDragging ? "1.03" : "1",
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="w-full rounded-xl border-l-4 py-4 bg-white hover:shadow-lg transition-all"
        >
            <CardHeader className="relative">
                <CardTitle>{lead.company_name}</CardTitle>
                <CardDescription>{lead.full_name}</CardDescription>
                <GripVertical
                    {...listeners}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-grab"
                />
            </CardHeader>

            <CardContent
                onDoubleClick={() => setShowAll(!showAll)}
                className={cn("text-sm text-gray-700", {
                    "h-12 overflow-hidden": !showAll,
                    "h-auto": showAll,
                })}
            >
                <div dangerouslySetInnerHTML={{
                    __html: lead.company_info
                }} />
            </CardContent>

            <CardFooter className="justify-between">
                <time dateTime={dayjs(lead.created_at).format("YYYY-MM-DD")}>
                    {dayjs(lead.created_at).format("YYYY-MM-DD HH:mm")}
                </time>
                <LeadOption />
            </CardFooter>
        </Card>
    );
};

interface Props { lead: LeadType }