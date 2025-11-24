"use client";

import { ClientNoData } from "@/components/widgets/client-no-data";
import { Grip, GripVertical } from "lucide-react";
import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Tasks } from "./tasks";
import type { ColumnType } from "./columns";
import { ColumnEdit } from "./column-edit";
import { DeleteColumn } from "./delete-column";

export const Column = ({ columnData: { columnId, name, tasks = [], hex, isCompleted } }: ComponentProps<"div"> & { columnData: ColumnType }) => {
    const { setNodeRef: setSortableRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: `column-${columnId}`,
    });

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({
        id: `tasks-container-${columnId}`,
    });

    const combinedRef = (node: HTMLElement | null) => {
        setSortableRef(node);
    };

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        borderColor: hex,
    };

    return (
        <div ref={combinedRef} className={cn("bg-white relative border border-dashed rounded-xl px-4 py-6 space-y-6 w-md", { "z-10 shadow-xl drop-shadow-2xl": isDragging })} style={{ ...style, }} {...attributes}>
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                    {name} ({tasks.length})
                </h3>

                <div className="flex gap-2">
                    <div className="group relative">
                        <GripVertical className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                        <div className="absolute -top-5 -left-1/2 opacity-0 group-hover:opacity-100 space-y-2.5 bg-white p-1.5 rounded transition-all duration-300 transform -translate-x-1/2 ">
                            <ColumnEdit columnData={{ columnId, name, hex, isCompleted }} />
                            <DeleteColumn columnId={columnId} hasTasks={!(tasks.length > 0)} />
                        </div>
                    </div>

                    <Grip {...listeners} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                </div>
            </div>

            <div ref={setDroppableRef} className={cn("min-h-20", { "bg-blue-50/30": isOver })}>
                {tasks.length > 0 ? <Tasks tasks={tasks} /> : <ClientNoData />}
            </div>
        </div>
    );
};
