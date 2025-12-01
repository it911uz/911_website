import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { CompanyTabTrigger } from "./company-tab-trigger";
import { searchParamsCache } from "@/lib/search-params.util";
import { ContactsContent } from "./contacts/contacts-content";
import { CommentsContent } from "./comments/comments-content";
import { SubscriptionContent } from "./subscriptions/subscription-content";

export const CompanyTabs = async ({ companyId }: Props) => {
    const tab = await searchParamsCache.get("tab");

    return <section
        data-slot="tabs"
        className="px-4 py-10 lg:px-8"
    >
        <Tabs defaultValue={tab || "contacts"} className="w-full">
            <TabsList>
                <CompanyTabTrigger value="contacts" label="Контакты" />
                <CompanyTabTrigger value="subscriptions" label="Подписки" />
                <CompanyTabTrigger value="comments" label="Комментарии" />
            </TabsList>

            <TabsContent value="contacts">
                <ContactsContent companyId={companyId} />
            </TabsContent>
            <TabsContent value="subscriptions">
                <SubscriptionContent companyId={companyId} />
            </TabsContent>
            <TabsContent value="comments">
                <CommentsContent companyId={companyId} />
            </TabsContent>
        </Tabs>
    </section>
};

interface Props {
    companyId: number
}