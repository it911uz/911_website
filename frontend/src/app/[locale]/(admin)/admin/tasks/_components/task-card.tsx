"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, GripVertical, ClockAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { LeadType } from "./columns";
import dayjs from "dayjs";
import { EditTag } from "./edit-tag";
import { Link } from "@/i18n/navigation";
import { Routers } from "@/configs/router.config";

export const TaskCard = ({ task }: Props) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: `task-${task.id}`,
    });

    const [showAll, setShowAll] = useState(false);

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 9999 : 1,
        boxShadow: isDragging ? "0 14px 30px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.06)",
        scale: isDragging ? "1.03" : "1",
    };

    const isExistDate = dayjs().diff(dayjs(task.updated_at), "hour") > 24;

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={cn(
                "w-full rounded-xl border-l-4 py-4 bg-white hover:shadow-xl transition-all group cursor-default",
                { "border-l-red-500 border border-red-300": isExistDate }
            )}
        >
            <CardHeader className="relative pb-2">
                <div className="flex items-center justify-between gap-3">
                    <CardTitle
                        className={cn(
                            "text-base font-semibold",
                            isExistDate && "text-red-600"
                        )}
                    >
                        {task.name}
                    </CardTitle>

                    <GripVertical
                        {...listeners}
                        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing transition"
                    />
                </div>

                <CardDescription
                    className={cn(
                        "flex items-center gap-1 mt-1 text-sm",
                        isExistDate && "text-red-500 font-medium"
                    )}
                >
                    {dayjs(task.deadline).format("DD.MM.YYYY")}

                    {isExistDate && (
                        <span className="flex items-center gap-1 ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-md">
                            <ClockAlert className="w-3 h-3" />
                            Просрочено
                        </span>
                    )}
                </CardDescription>
            </CardHeader>

            <CardContent
                onDoubleClick={() => setShowAll(!showAll)}
                className="text-sm text-gray-700 space-y-5 relative transition-all duration-300"
            >
                <div
                    className={cn(
                        "relative rounded-xl bg-gray-50 border p-4 shadow-sm hover:shadow-md transition-all duration-300",
                        isExistDate ? "border-red-300 bg-red-50/60" : "border-gray-200 bg-gray-50",
                        !showAll ? "h-16 overflow-hidden" : "h-auto"
                    )}
                >
                    <div
                        className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: task.description }}
                    />

                    {!showAll && (
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-gray-50/90 to-transparent flex items-end justify-center pb-1.5">
                            <span className="text-xs text-gray-500 group-hover:text-gray-700 transition">
                                (Дважды нажмите, чтобы развернуть)
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="justify-between gap-5 flex-col items-start pt-2">
                <p className="text-sm text-gray-700">
                    {task.users.map((user) => user.full_name).join(", ")}
                </p>

                <div className="flex flex-wrap gap-3">
                    {task.tags.map((tag) => (
                        <EditTag key={tag.id} tag={tag} />
                    ))}
                </div>

                <div className="ml-auto opacity-0 group-hover:opacity-100 transition">
                    <Link href={Routers.admin.tasksById(task.id)}>
                        <Eye className="w-5 h-5 text-gray-600 hover:text-black" />
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

interface Props {
    task: LeadType;
}
