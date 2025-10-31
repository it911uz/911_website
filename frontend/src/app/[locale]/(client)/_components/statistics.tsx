import { Container } from "@/components/widgets/container";
import { StatColumn } from "./statistic-column";
import { getTranslations } from "next-intl/server";

export const Statistics = async () => {
    const t = await getTranslations("HomePage.Statistics");
    const statsData = [
        {
            value: 98,
            unit: "%",
            description: t("level"),
            height: "560px",
            delay: 0.1,
        },
        {
            value: 250,
            unit: "+",
            description: t("clients"),
            height: "950px",
            delay: 0.2,
        },
        {
            value: 3,
            unit: "X",
            description: t("increase"),
            height: "560px",
            delay: 0.3,
        },
        {
            value: 150,
            unit: "+",
            description: t("projects"),
            height: "680px",
            delay: 0.4,
        },
    ];

    return (
        <section data-slot="statistics" className="py-12 md:py-24 bg-white overflow-x-hidden">
            <Container>
                <ul className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 place-items-end xl:border-r xl:border-gray-200">
                    {statsData.map((stat, index) => (
                        <StatColumn
                            key={index}
                            value={stat.value}
                            unit={stat.unit}
                            description={stat.description}
                            height={stat.height}
                            delay={stat.delay}
                        />
                    ))}
                </ul>
            </Container>
        </section>
    );
};