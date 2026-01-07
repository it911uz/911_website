import { auth } from "@/auth";
import { CreateEmploy } from "./create-employ";
import { EmployeesFilter } from "./employees-filter";
import { EmployeesTable } from "./employees-table";
import { PERMISSIONS } from "@/const/permissions.const";

export const EmployeesContent = async () => {
    const session = await auth();

    const canCreateEmploy = session?.user.permissions.includes(PERMISSIONS.create_users);
    const canSeeEmployees = session?.user.permissions.includes(PERMISSIONS.view_users);

    return <>
        <section
            data-slot="leads"
            className="px-4 py-10 lg:px-8 "
        >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-3xl font-bold ">
                        Сотрудники
                    </h2>
                    <p className="text-gray-01 mt-1">
                        Управляйте своими сотрудниками, конвертируйте и отслеживайте эффективность.
                    </p>
                </div>

                {
                    canCreateEmploy && <CreateEmploy />
                }
            </div>
        </section>

        {
            canSeeEmployees && <>
                <EmployeesFilter />

                <EmployeesTable />
            </>
        }
    </>
};