import { CompaniesTable } from "./companies-table";
import { CreateCompany } from "./create-company";

export const CompaniesContent = async () => {
    return <>
        <section
            data-slot="companies"
            className="px-4 py-10 lg:px-8 "
        >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-3xl font-bold ">
                        Компании
                    </h2>
                    <p className="text-gray-01 mt-1">
                        Управляйте своими компаниями, конвертируйте и отслеживайте эффективность.
                    </p>
                </div>

                <CreateCompany />
            </div>
        </section>

        <CompaniesTable />
    </>
};