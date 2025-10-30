import { Container } from "@/components/widgets/container";
import { StatColumn } from "./statistic-column";

export const Statistics = () => {
    const statsData = [
        {
            value: 98,
            unit: "%",
            description: "Уровень удовлетворенности клиентов благодаря безупречной поддержке и внедрению только передовых IT-решений.",
            height: "560px",
            delay: 0,
        },
        {
            value: 250,
            unit: "+",
            description: "Крупных обслуженных бизнесов и корпоративных клиентов, доверяющих нам в Республике Узбекистан.",
            height: "950px",
            delay: 0.1,
        },
        {
            value: 3,
            unit: "X",
            description: "Среднее увеличение продаж наших клиентов, достигнутое благодаря эффективной цифровой трансформации.",
            height: "560px",
            delay: 0.2,
        },
        {
            value: 150,
            unit: "+",
            description: "Успешно реализованных проектов, которые принесли ощутимую прибыль и развитие компаниям по всему Узбекистану.",
            height: "680px",
            delay: 0.3,
        },
    ];

    return (
        <section data-slot="statistics" className="py-12 md:py-24 bg-white overflow-x-hidden">
            <Container>
                <ul className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-10 border-b border-gray-200 place-items-end">
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