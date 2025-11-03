"use client";

import { ClientNoData } from "@/components/widgets/client-no-data";
import { EllipsisVertical, Grip } from "lucide-react";
import type { ComponentProps, CSSProperties } from "react";
import { ColumnEdit } from "./column-edit";
import { DeleteColumn } from "./delete-column";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Issues } from "./issues";

export const Column = ({
    columnData: { columnId, hex = "#000", name, issues = [] },
    className,
    ...props
}: ComponentProps<"div"> & {
    columnData: ColumnType;
}) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
        useSortable({
            id: columnId,
        });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            data-column-id={columnId}
            className={cn(
                "bg-white border border-dashed rounded-xl px-4 py-6 space-y-6 w-[430px]",
                { "z-2 shadow-xl drop-shadow-2xl": isDragging }
            )}
            style={{ ...style, borderColor: hex }}
            {...props}
            {...attributes}
        >
            <div className="flex justify-between items-center">
                <h3>
                    {name} ({issues.length})
                </h3>

                <div className={cn("flex gap-1.5")}>
                    <div className="relative group">
                        <EllipsisVertical className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                        <div className="absolute top-1/2 -right-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md rounded-md p-2 space-y-2">
                            <ColumnEdit />
                            <DeleteColumn />
                        </div>
                    </div>
                    <Grip {...listeners} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                </div>
            </div>

            {issues.length > 0 ? <Issues issues={issues} /> : <ClientNoData />}
        </div>
    );
};

export interface ColumnType {
    columnId: number;
    hex: string;
    issues: TaskType[];
    name: string;
    position: number;
}

export interface TaskType {
    id: number;
    position: number;
    created_at: Date;
    updated_at: Date;
    deadline: Date;
    name: string;
    message: string;
    tags: Tag[];
    status: number;
    comments: string;
    files: string[] | File[];
    executors: Executor[];
}

interface Tag {
    id: number;
    name: string;
}

interface Executor {
    id: number;
    full_name: string;
}
