import { Hint } from "@/components/ui/hint";
import { TableCell, TableRow } from "@/components/ui/table";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";
import type { Company } from "@/types/company.type";
import { Eye } from "lucide-react";
import { EditCompany } from "./edit-company";
import { DeleteCompany } from "./delete-company";

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
                <div className="flex gap-5 justify-end items-center">
                    <Link href={Routers.admin.companiesById(company.id)}>
                        <Hint >
                            <Eye className="text-2xl cursor-pointer hover:text-blue-600" />
                        </Hint>
                    </Link>

                    <EditCompany company={company} />

                    <DeleteCompany id={company.id} />
                </div>
            </TableCell>
        </TableRow>
    );
};

interface Props {
    index: number;
    company: Company;
}