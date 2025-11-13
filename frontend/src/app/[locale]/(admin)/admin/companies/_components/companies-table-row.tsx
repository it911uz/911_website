import { TableCell, TableRow } from "@/components/ui/table";
import type { Company } from "@/types/company.type";

export const CompaniesTableRow = ({ index, company }: Props) => {
    return (
        <TableRow>
            <TableCell>
                {index}
            </TableCell>

            <TableCell>
                {company.name}
            </TableCell>

            <TableCell>
                {company.phone_number}
            </TableCell>

            <TableCell>
                {company.status}
            </TableCell>

            <TableCell >
            
            </TableCell>
        </TableRow>
    );
};

interface Props {
    index: number;
    company: Company;
}