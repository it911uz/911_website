import { CreateSubscription } from "./create-subscription";
import { SubscriptionTable } from "./subscription-table";
import { SubscriptionsFilter } from "./subscriptions-filter";

export const SubscriptionContent = async ({ companyId }: Props) => {
    return (
        <section className="py-7 space-y-6">
            <div className="flex justify-between">
                <SubscriptionsFilter />

                <CreateSubscription />
            </div>

            <SubscriptionTable companyId={companyId} />
        </section>
    );
};

interface Props {
    companyId: number
}