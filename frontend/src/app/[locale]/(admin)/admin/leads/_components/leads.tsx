"use client";

import { LeadCard } from "./lead-card";
import type { LeadType } from "./columns";

export const Leads = ({ leads = [] }: { leads: LeadType[] }) => {
    return (
        <ul className="space-y-2.5">
            {leads.sort((a, b) => b.position - a.position).map((lead) => (
                <li key={lead.id}>
                    <LeadCard lead={lead} />
                </li>
            ))}
        </ul>
    );
};
