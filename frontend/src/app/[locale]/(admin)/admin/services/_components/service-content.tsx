import { CreateService } from "./create-servie"
import { ServicesTable } from "./service-table"

export const ServiceContent = () => {
    return <>
        <section data-slot="service" className="px-4 py-10 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-bold">
                        Услуги
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Управляйте своими услугами, конвертируйте и отслеживайте эффективность.
                    </p>
                </div>

                <CreateService />
            </div>
        </section>

        <ServicesTable />
    </>
}