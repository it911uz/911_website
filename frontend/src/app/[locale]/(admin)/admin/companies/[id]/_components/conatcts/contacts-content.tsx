import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "@/components/ui/table"
import { CreateCompany } from "./create-contact"

export const ContactsContent = async () => {
    return (
        <section
            data-slot="contacts"
            className="py-7 space-y-5"
        >
            <div className="text-right">
                <CreateCompany />
            </div>

            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableHeaderCell>№</TableHeaderCell>
                        <TableHeaderCell>Имя ответственного лица / организации</TableHeaderCell>
                        <TableHeaderCell>Должность</TableHeaderCell>
                        <TableHeaderCell>Номер телефона</TableHeaderCell>
                        <TableHeaderCell>Электронная почта</TableHeaderCell>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Иван Иванов</TableCell>
                            <TableCell>Директор</TableCell>
                            <TableCell>+998 99 999 99 99</TableCell>
                            <TableCell>ivan.ivanov@example.com</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>ООО «ТехноСервис»</TableCell>
                            <TableCell>Менеджер проектов</TableCell>
                            <TableCell>+998 97 123 45 67</TableCell>
                            <TableCell>contact@technoservice.uz</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Анна Петрова</TableCell>
                            <TableCell>Бухгалтер</TableCell>
                            <TableCell>+998 90 765 43 21</TableCell>
                            <TableCell>anna.petrova@example.com</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableWrapper>
        </section>
    )
}
