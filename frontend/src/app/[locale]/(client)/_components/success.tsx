

import { Wrapper } from "@/components/ui/wrapper";
import { Container } from "@/components/widgets/container";
import { SuccessContent } from "./success-content";
import { getTranslations } from "next-intl/server";

export const Success = async () => {
    const t = await getTranslations("HomePage.Success");

    return (
        <section data-slot="success" className="py-12 md:py-24 bg-white overflow-x-hidden">
            <Container>
                <Wrapper className="gap-6" column={1} md={2} >
                    <h2
                        className="text-gray-600 text-2xl md:text-3xl font-bold tracking-wide"
                    >
                        {t("title")}
                    </h2>

                    <SuccessContent />
                </Wrapper>
            </Container>
        </section>
    );
};