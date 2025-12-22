import { CompaniesFilter } from "./companies-filter";
import { CompaniesTable } from "./companies-table";
import { CreateCompany } from "./create-company";

export const CompaniesContent = async () => {
    return (
        <div className="space-y-6">
            <section
                data-slot="companies"
                className="px-4 pt-10 lg:px-8"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Компании
                        </h2>

                        <p className="text-sm sm:text-base text-gray-01 max-w-xl">
                            Управляйте своими компаниями, конвертируйте и отслеживайте эффективность.
                        </p>
                    </div>

                    <div className="w-full sm:w-auto">
                        <CreateCompany />
                    </div>
                </div>
            </section>

            <CompaniesFilter />

            <CompaniesTable />
        </div>
    );
};
