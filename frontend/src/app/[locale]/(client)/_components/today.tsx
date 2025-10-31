import { Wrapper } from "@/components/ui/wrapper"
import { Container } from "@/components/widgets/container"
import { getTranslations } from "next-intl/server"

export const Today = async () => {
    const t = await getTranslations("HomePage.Today");

    return (
        <section data-slot="today" className="py-16 overflow-x-hidden">
            <Container>
                <Wrapper className="gap-6" column={1} md={2} >

                    <h2 className="text-gray-900 text-3xl font-extrabold tracking-tight pt-2">
                        {t("title")}
                    </h2>

                    <div className="max-w-4xl space-y-4">
                        <h3 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                            {t("subtitle")}
                        </h3>

                        <p className="text-2xl text-gray-600">
                            {
                                t("description")
                            }
                        </p>
                    </div>
                </Wrapper>
            </Container>
        </section>
    )
}