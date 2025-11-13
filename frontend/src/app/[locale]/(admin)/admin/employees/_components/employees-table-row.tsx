import { TableCell, TableRow } from "@/components/ui/table"
import type { User } from "@/types/user.type"
import { Minus } from "lucide-react";
import { DeleteEmploy } from "./delete-employ";
import { EditEmploy } from "./edit-employ";

export const EmployeesTableRow = ({ index, user }: Props) => {
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
                <EditEmploy user={user} />
                <DeleteEmploy id={user.id} />
            </div>
        </TableCell>
    </TableRow>
}

interface Props {
    user: User;
    index: number;
}