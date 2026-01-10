import { getCompany } from "@/api/companies/get-company.api";
import { auth } from "@/auth";
import { CompanyTabs } from "./company-tabs";
import { PrivacyError } from "@/components/widgets/privacy-error";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Routers } from "@/configs/router.config";

export const CompanyContent = async ({ companyId }: Props) => {
    const session = await auth();

    const { data, error } = await getCompany({
        token: session?.user.accessToken,
        id: companyId
    });

    if (error?.response.status === 403) {
        return <PrivacyError />
    }

    return (
        <>
            <section
                data-slot="company"
                className="px-4 py-10 lg:px-8"
            >
                <Breadcrumb className="mb-10">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={Routers.admin.companies}>Компании</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {data.name}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">

                    <div className="space-y-6 flex-1">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {data.name}
                        </h2>

                        <div className="space-y-2">
                            <span className="block text-sm font-medium text-gray-500">
                                Информация:
                            </span>

                            <div
                                className="prose prose-sm prose-gray max-w-5xl rounded-md bg-gray-50 p-4 shadow-sm"
                                dangerouslySetInnerHTML={{
                                    __html: data.info ?? ""
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <span className="block text-sm font-medium text-gray-500">
                                Телефон номер:
                            </span>

                            <a
                                href={`tel:${data.phone_number}`}
                                className="text-lg font-semibold text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {data.phone_number}
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            <CompanyTabs companyId={companyId} />
        </>
    );
};

interface Props {
    companyId: number;
}
