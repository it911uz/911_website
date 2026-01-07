import { auth } from "@/auth";
import { TargetFilter } from "./target-filter";
import { TargetHeader } from "./target-header";
import { TargetTable } from "./target-table";
import { PERMISSIONS } from "@/const/permissions.const";

export const TargetContent = async () => {
    const session = await auth();

    const canTargetView = session?.user.permissions.includes(PERMISSIONS.view_target_companies);

    return (
        <div className="space-y-6">
            <TargetHeader />

            {
                canTargetView && <>
                    <TargetFilter />

                    <TargetTable />
                </>
            }
        </div>
    );
};
