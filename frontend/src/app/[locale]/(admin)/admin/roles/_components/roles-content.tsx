import { auth } from "@/auth";
import { CreateRole } from "./create-role"
import { RolesFilter } from "./roles-filter"
import { RolesTable } from "./roles-table"
import { PERMISSIONS } from "@/const/permissions.const";

export const RolesContent = async () => {
    const session = await auth();

    const canCreateRole = session?.user.permissions.includes(PERMISSIONS.create_roles);
    const canSeeRoles = session?.user.permissions.includes(PERMISSIONS.view_roles);

    return <>
        <section
            data-slot="leads"
            className="px-4 py-10 lg:px-8 "
        >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-3xl font-bold ">
                        Роли
                    </h2>
                    <p className="text-gray-01 mt-1">
                        Управляйте своими ролями, конвертируйте и отслеживайте эффективность.
                    </p>
                </div>

                {
                    canCreateRole && <CreateRole />
                }
            </div>
        </section>

        {
            canSeeRoles && <>
                <RolesFilter />

                <RolesTable />
            </>
        }
    </>
}