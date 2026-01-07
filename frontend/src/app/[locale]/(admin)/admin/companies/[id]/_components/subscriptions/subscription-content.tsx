import { auth } from "@/auth";
import { CreateSubscription } from "./create-subscription";
import { SubscriptionTable } from "./subscription-table";
import { SubscriptionsFilter } from "./subscriptions-filter";
import { PERMISSIONS } from "@/const/permissions.const";

export const SubscriptionContent = async ({ companyId }: Props) => {
    const session = await auth();

    const canSeeSubscriptions = session?.user.permissions.includes(PERMISSIONS.view_subscriptions);
    const canCreateSubscriptions = session?.user.permissions.includes(PERMISSIONS.create_subscriptions);

    return (
        <section className="py-7 space-y-6">
            <div className="flex justify-between">
                <SubscriptionsFilter />

                {
                    canCreateSubscriptions && <CreateSubscription />
                }

            </div>

            {
                canSeeSubscriptions && <SubscriptionTable companyId={companyId} />
            }


        </section>
    );
};

interface Props {
    companyId: number
}