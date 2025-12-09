import { TableCell, TableRow } from "@/components/ui/table"
import { DeleteTarget } from "./delete-target";
import { UpdateTarget } from "./update-target";
import type { Target } from "@/types/target.type";

export const TargetTableRow = ({ index, target }: Props) => {
    return <TableRow>
        <TableCell>
            {index}
        </TableCell>

        <TableCell>
            {target.id}
        </TableCell>

        <TableCell>
            {target.name}
        </TableCell>

        <TableCell>
            {target.leads_count}
        </TableCell>

        <TableCell>
            {target.is_active ? 'Да' : 'Нет'}
        </TableCell>

        <TableCell>
            <div className="flex gap-5">
                <UpdateTarget target={target} />

                <DeleteTarget id={target.id} />
            </div>

        </TableCell>
    </TableRow>
}

interface Props {
    index: number;
    target: Target;
}