import { Wrapper } from "@/components/ui/wrapper"
import { Container } from "@/components/widgets/container"

export const Today = () => {
    return (
        <section data-slot="today" className="py-16">
            <Container>
                <Wrapper className="gap-6" column={1} md={2} >

                    <h2 className="text-gray-900 text-3xl font-extrabold tracking-tight pt-2">
                        ~ Наша миссия
                    </h2>

                    <div className="max-w-4xl space-y-4">
                        <p className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                            Ваш успех — наш главный приоритет.
                        </p>

                        <p className="text-2xl text-gray-600">
                            Мы непрерывно улучшаем качество наших услуг, стремясь предложить вам исключительный сервис. Благодарим за то, что выбираете нас и доверяете нам свои проекты!
                        </p>
                    </div>
                </Wrapper>
            </Container>
        </section>
    )
}