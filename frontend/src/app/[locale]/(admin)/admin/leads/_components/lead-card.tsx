"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Mail, Phone } from "lucide-react";
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
                className={cn(
                    "text-sm text-gray-700 space-y-5 relative transition-all duration-300 group"
                )}
            >
                <div
                    className={cn(
                        "relative rounded-xl bg-gray-50 border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300",
                        {
                            "h-16 overflow-hidden": !showAll,
                            "h-auto": showAll,
                        }
                    )}
                >
                    <div
                        className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: lead.company_info,
                        }}
                    />

                    {!showAll && (
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-gray-50 to-transparent flex items-end justify-center pb-1.5">
                            <span className="text-xs text-gray-500 group-hover:text-gray-700 transition">
                                (Дважды нажмите, чтобы развернуть)
                            </span>
                        </div>
                    )}
                </div>

                {lead.phone && (
                    <p className="flex items-center gap-2 text-gray-800 font-medium">
                        <Phone size={16} className="text-blue-600" />
                        <a
                            href={`tel:${lead.phone}`}
                            className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition"
                        >
                            {lead.phone}
                        </a>
                    </p>
                )}

                {/* email */}
                {lead.email && (
                    <p className="flex items-center gap-2 text-gray-800 font-medium break-all">
                        <Mail size={16} className="text-blue-600" />
                        <a
                            href={`mailto:${lead.email}`}
                            className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition"
                        >
                            {lead.email}
                        </a>
                    </p>
                )}
            </CardContent>

            <CardFooter className="justify-between">
                <time dateTime={dayjs(lead.created_at).format("YYYY-MM-DD")}>
                    {dayjs(lead.created_at).format("HH:mm YYYY-MM-DD")}
                </time>

                <LeadOption lead={lead} />
            </CardFooter>
        </Card>
    );
};

interface Props { lead: LeadType }