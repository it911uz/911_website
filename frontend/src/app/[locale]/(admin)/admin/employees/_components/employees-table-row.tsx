import { TableCell, TableRow } from "@/components/ui/table"
import type { User } from "@/types/user.type"
import { Minus } from "lucide-react";
import { DeleteEmploy } from "./delete-employ";
import { EditEmploy } from "./edit-employ";
import { auth } from "@/auth";
import { PERMISSIONS } from "@/const/permissions.const";

export const EmployeesTableRow = async ({ index, user }: Props) => {
    const session = await auth();

    const canEditUser = session?.user.permissions.includes(PERMISSIONS.update_users);
    const canDeleteUser = session?.user.permissions.includes(PERMISSIONS.delete_users);

    return <TableRow>
        <TableCell>
            {index}
        </TableCell>

        <TableCell>
            {user.full_name}
        </TableCell>

        <TableCell>
            {user.role.name}
        </TableCell>

        <TableCell>
            {user.email}
        </TableCell>

        <TableCell>
            {user.phone_number ? user.phone_number : <Minus />}
        </TableCell>

        <TableCell>
            <div className="flex gap-5 justify-end">
                {
                    canEditUser && <EditEmploy user={user} />
                }
                {
                    canDeleteUser && <DeleteEmploy id={user.id} />
                }
            </div>
        </TableCell>
    </TableRow>
}

interface Props {
    user: User;
    index: number;
}