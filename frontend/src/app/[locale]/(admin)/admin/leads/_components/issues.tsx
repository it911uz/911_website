"use client";

import type { Lead } from "@/types/leads.type";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const Issues = ({ issues }: Props) => {
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return <DndContext>
        <ul data-slot="issues">
            {
                issues.map((issue) => <li key={issue.id}>{issue.full_name}</li>)
            }
        </ul>
    </DndContext>
};

interface Props {
    issues: Lead[]
}