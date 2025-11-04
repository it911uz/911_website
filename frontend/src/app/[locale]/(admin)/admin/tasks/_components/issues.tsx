"use client";

import { Issue } from "./issue";
import type { TaskType } from "./column";

export const Issues = ({ issues = [] }: Props) => {
    return (
        <ul data-slot="issues" className="space-y-2.5">
            {issues.map((issue) => (
                <li key={issue.id}>
                    <Issue issue={issue} />
                </li>
            ))}
        </ul>
    );
};

interface Props {
    issues: TaskType[];
}
