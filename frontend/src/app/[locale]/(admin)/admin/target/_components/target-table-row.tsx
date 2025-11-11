import { TableCell, TableRow } from "@/components/ui/table"
import { DeleteTarget } from "./delete-target";

export const TargetTableRow = ({ leadsCount, name, isActive, index, id }: Props) => {
    return <TableRow>
        <TableCell>
            {index}
        </TableCell>

        <TableCell>
            {id}
        </TableCell>

        <TableCell>
            {name}
        </TableCell>

        <TableCell>
            {leadsCount}
        </TableCell>

        <TableCell>
            {isActive ? 'Да' : 'Нет'}
        </TableCell>

        <TableCell>
            <DeleteTarget id={id} />
        </TableCell>
    </TableRow>
}

interface Props {
    index: number;
    name: string,
    leadsCount: number;
    isActive: boolean;
    id: string
}