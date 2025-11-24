"use client";

import { TaskCard } from "./task-card";
import type { LeadType } from "./columns";

export const Tasks = ({ tasks = [] }: { tasks: LeadType[] }) => {
    return (
        <ul className="space-y-2.5">
            {tasks.sort((a, b) => b.position - a.position).map((task) => (
                <li key={task.id}>
                    <TaskCard task={task} />
                </li>
            ))}
        </ul>
    );
};
