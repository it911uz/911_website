import { TargetFilter } from "./target-filter";
import { TargetHeader } from "./target-header";
import { TargetTable } from "./target-table";

export const TargetContent = async () => {
    return (
        <div className="space-y-6">
            <TargetHeader />
            <TargetFilter />
            <TargetTable />
        </div>
    );
};
