import { TableCell, TableRow } from "@/components/ui/table"
import type { Role } from "@/types/roles.type"
import { DeleteRole } from "./delete-role";
import { EditRole } from "./edit-role";

export const RolesTableRow = ({ role, index }: Props) => {
    return <TableRow>
        <TableCell>
            {index}
        </TableCell>

        <TableCell>
            {role.name}
        </TableCell>

        <TableCell>
            <div className="flex gap-5 items-center justify-end">
                <EditRole role={role} />
                <DeleteRole id={role.id} />
            </div>
        </TableCell>
    </TableRow>
}

interface Props {
    role: Role;
    index: number
}