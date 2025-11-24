import { getCompanyPayment } from "@/api/companies/get-company-payment.ai";
import { PaymentsSheet } from "./payments-sheet";

export const PaymentsContent = async ({ companyId, subscriptionId }: Props) => {
    const { data } = await getCompanyPayment({ companyId, subscriptionId });
    return <PaymentsSheet paymentsData={data} />
};

interface Props {
    companyId: number;
    subscriptionId: number
}