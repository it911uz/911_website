import { getCompanyComments } from "@/api/companies/get-company-comments.api";
import { auth } from "@/auth";
import { ClientNoData } from "@/components/widgets/client-no-data";
import { Card, CardContent } from "@/components/ui/card";

export const CommentsContent = async ({ companyId }: Props) => {
    const session = await auth();

    const { data } = await getCompanyComments({
        token: session?.user.accessToken,
        id: companyId
    });

    return (
        <section className="py-7 space-y-6">
            {data.length ? (
                <div className="space-y-4">
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            className="rounded-xl shadow-sm hover:shadow-md transition-all py-2"
                        >
                            <CardContent className="py-4">
                                <div className="space-y-3">
                                    <div className="text-xs font-medium text-muted-foreground mt-1">
                                        #{item.id}
                                    </div>

                                    <div className="text-sm leading-relaxed text-gray-800" dangerouslySetInnerHTML={{ __html: item.comment }} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <ClientNoData />
            )}
        </section>
    );
};

interface Props {
    companyId: number;
}
