import { getCompanyPayment } from "@/api/companies/get-company-payments.api";
import { PaymentsSheet } from "./payments-sheet";
import { auth } from "@/auth";

export const PaymentsContent = async ({ companyId, subscriptionId }: Props) => {
    const session = await auth();

    const { data } = await getCompanyPayment({ companyId, subscriptionId, token: session?.user.accessToken });


    return <PaymentsSheet paymentsData={data} subscriptionId={subscriptionId} />
};

interface Props {
    companyId: number;
    subscriptionId: number
}