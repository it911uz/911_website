import { getCompanyComments } from "@/api/companies/get-company-comments.api";
import { auth } from "@/auth";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ClientNoData } from "@/components/widgets/client-no-data";
import dayjs from "dayjs";

export const CommentsContent = async ({ companyId }: Props) => {
    const session = await auth();

    const { data } = await getCompanyComments({
        token: session?.user.accessToken,
        id: companyId
    });

    return <section
        data-slot="contacts"
        className="py-7 space-y-5"
    >
        {
            data.length ? <Accordion type="single" collapsible>

                {
                    data.map((comment) => (
                        <AccordionItem value={comment.id.toString()}>
                            <AccordionTrigger>
                                {dayjs(comment.created_at).format("DD.MM.YYYY")}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }

            </Accordion> : <ClientNoData />
        }

    </section>
}

interface Props {
    companyId: number
}