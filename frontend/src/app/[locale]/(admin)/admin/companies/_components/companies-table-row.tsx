import { Hint } from "@/components/ui/hint";
import { TableCell, TableRow } from "@/components/ui/table";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";
import type { Company } from "@/types/company.type";
import { Eye } from "lucide-react";
import { EditCompany } from "./edit-company";
import { DeleteCompany } from "./delete-company";
import { SwitchStatus } from "./switch-status";
import { auth } from "@/auth";
import { PERMISSIONS } from "@/const/permissions.const";

export const CompaniesTableRow = async ({ index, company }: Props) => {
    const session = await auth();

    const canSeeCompany = session?.user.permissions.includes(PERMISSIONS.view_companies);
    const canEditCompany = session?.user.permissions.includes(PERMISSIONS.update_companies);
    const canDeleteCompany = session?.user.permissions.includes(PERMISSIONS.delete_companies);

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
                <SwitchStatus companyData={company} />
            </TableCell>

            <TableCell >
                <div className="flex gap-5 justify-end items-center">
                    {
                        canSeeCompany && <Link href={Routers.admin.companiesById(company.id)}>
                            <Hint >
                                <Eye className="text-2xl cursor-pointer hover:text-blue-600" />
                            </Hint>
                        </Link>
                    }

                    {
                        canEditCompany && <EditCompany company={company} />
                    }

                    {
                        canDeleteCompany && <DeleteCompany id={company.id} />
                    }
                </div>
            </TableCell>
        </TableRow>
    );
};

interface Props {
    index: number;
    company: Company;
}