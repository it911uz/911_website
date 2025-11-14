"use client";

import { TaskCard } from "./task-card";
import type { LeadType } from "./columns";

export const Tasks = ({ leads = [] }: { leads: LeadType[] }) => {
    return (
        <ul className="space-y-2.5">
            {leads.sort((a, b) => b.position - a.position).map((lead) => (
                <li key={lead.id}>
                    <TaskCard lead={lead} />
                </li>
            ))}
        </ul>
    );
};
