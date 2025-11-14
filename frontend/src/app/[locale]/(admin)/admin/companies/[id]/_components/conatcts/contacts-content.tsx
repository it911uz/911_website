import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "@/components/ui/table"
import { CreateCompany } from "./create-contact"
import { auth } from "@/auth";
import { getCompanyContacts } from "@/api/companies/get-company-contacts.api";
import { ClientNoData } from "@/components/widgets/client-no-data";
import { EditContact } from "./edit-contact";

export const ContactsContent = async ({ companyId }: Props) => {
    const session = await auth();

    const { data } = await getCompanyContacts({
        token: session?.user.accessToken,
        id: companyId
    });

    return (
        <section
            data-slot="contacts"
            className="py-7 space-y-5"
        >
            <div className="text-right">
                <CreateCompany />
            </div>

            {
                data.length ? <TableWrapper>
                    <Table>
                        <TableHeader>
                            <TableHeaderCell>№</TableHeaderCell>
                            <TableHeaderCell>Имя ответственного лица / организации</TableHeaderCell>
                            <TableHeaderCell>Должность</TableHeaderCell>
                            <TableHeaderCell>Номер телефона</TableHeaderCell>
                            <TableHeaderCell>Электронная почта</TableHeaderCell>
                            <TableHeaderCell />
                        </TableHeader>

                        <TableBody>
                            {
                                data.map((contact, index) => (
                                    <TableRow key={contact.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{contact.full_name}</TableCell>
                                        <TableCell>{contact.relation}</TableCell>
                                        <TableCell>{contact.phone_number}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-5 justify-end">
                                                <EditContact contact={contact} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </TableWrapper> : <ClientNoData />
            }


        </section>
    )
}

interface Props {
    companyId: number
}