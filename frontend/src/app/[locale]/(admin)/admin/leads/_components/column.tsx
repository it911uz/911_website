"use client";

import { ClientNoData } from "@/components/widgets/client-no-data";
import { useOpen } from "@/hooks/use-open";
import type { Lead } from "@/types/leads.type";
import { EllipsisVertical, Grip } from "lucide-react";
import type { ComponentProps, CSSProperties } from "react";
import { ColumnEdit } from "./column-edit";
import { DeleteColumn } from "./delete-column";
import { cn } from "@/lib/utils";
import { useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Issues } from "./issues";

export const Column = ({ columnData: { columnId, hex = "#000", name, issues = [] }, className, ...props }: ComponentProps<"div"> & {
    columnData: {
        columnId: number;
        hex: string;
        issues: Lead[];
        name: string;
    }
}) => {
    const { open, onOpenChange } = useOpen();
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: columnId,
        strategy: verticalListSortingStrategy,
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <div ref={setNodeRef}
        {...attributes}
        className={
            cn("bg-white border border-dashed rounded-xl px-4 py-6 space-y-6 w-[470px]", {
                "z-99999 shadow-xl drop-shadow-2xl": isDragging,
            })}
        style={{ ...style, borderColor: hex }}
        data-column-id={columnId}
        {...props}
    >

        <div className="flex justify-between items-center ">
            <h3>{name} ({issues.length})</h3>

            <div className={cn("flex gap-1.5")}>
                <div className="relative group">
                    <EllipsisVertical className="text-gray-500 hover:text-blue-500 cursor-pointer" />

                    <div className="absolute top-1/2 -right-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                  bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md rounded-md p-2 space-y-2">
                        <ColumnEdit />
                        <DeleteColumn />
                    </div>
                </div>


                <Grip {...listeners} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
            </div>
        </div>

        {
            issues.length > 0 ? <Issues issues={issues} /> : <ClientNoData />
        }
    </div>
}

export interface ColumnType {
    columnId: number;
    hex: string;
    issues: Issue[];
    name: string;
    position: number;
}

interface Issue extends Lead {
    created_at: Date;
    updated_at: Date;
}