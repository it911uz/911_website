import { TableCell, TableRow } from "@/components/ui/table"
import type { Role } from "@/types/roles.type"
import { DeleteRole } from "./delete-role";
import { EditRole } from "./edit-role";
import { auth } from "@/auth";
import { PERMISSIONS } from "@/const/permissions.const";

export const RolesTableRow = async ({ role, index }: Props) => {
    const session = await auth();
    const canEditRole = session?.user.permissions.includes(PERMISSIONS.update_roles);
    const canDeleteRole = session?.user.permissions.includes(PERMISSIONS.delete_roles);

    return <TableRow>
        <TableCell>
            {index}
        </TableCell>

        <TableCell>
            {role.name}
        </TableCell>

        <TableCell>
            <div className="flex gap-5 items-center justify-end">
                {
                    canEditRole && <EditRole role={role} />
                }

                {
                    canDeleteRole && <DeleteRole id={role.id} />
                }
            </div>
        </TableCell>
    </TableRow>
}

interface Props {
    role: Role;
    index: number
}