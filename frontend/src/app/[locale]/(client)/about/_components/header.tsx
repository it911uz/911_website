import { Wrapper } from "@/components/ui/wrapper";
import { Container } from "@/components/widgets/container";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";

export const Header = () => {
    return (
        <header className="relative py-48 md:py-64 bg-[#e6e6e6] overflow-hidden">
            <Container>
                <p className="text-right text-gray-500 text-xl md:text-2xl font-medium tracking-wide mb-4">
                    CRM &bull; Боты &bull; Веб-разработка
                </p>

                <h1 className="text-5xl md:text-7xl xl:text-[170px] leading-none text-center font-black tracking-wider text-[#c81e1e] uppercase">
                    О компании IT 911
                </h1>

                <Wrapper className="gap-10 grid-cols-1 md:grid-cols-2 mt-16 md:mt-24">
                    <div className="space-y-10 md:space-y-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            IT 911 — ваш надёжный партнёр в цифровой трансформации
                        </h2>

                        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                            Компания <strong>IT 911</strong>, следуя мировым трендам, переходит
                            от классических IT-услуг к комплексным решениям в сфере цифровой
                            трансформации. Такой подход позволяет нам создавать инновационные
                            продукты и предоставлять бизнесу новые возможности для роста и
                            масштабирования. Сегодня IT 911 занимает одну из ведущих позиций в
                            области <strong>Digital Transformation</strong> в Узбекистане.
                        </p>

                        <div className="pt-6">
                            <Link
                                href={Routers.contacts}
                                className="inline-block bg-[#c81e1e] text-white font-semibold text-lg px-10 py-4 rounded-full shadow-md transition-all hover:bg-[#a31818] hover:shadow-lg"
                                aria-label="Связаться с IT 911"
                            >
                                Связаться с нами
                            </Link>
                        </div>
                    </div>

                    <div className="text-lg md:text-xl leading-relaxed text-gray-700 space-y-6">
                        <p>
                            Анализируя мировые тенденции и локальный рынок, <strong>IT 911</strong> осознала,
                            что цифровая трансформация (Digital Transformation, DX) — это не просто модное
                            направление, а ключ к устойчивому развитию бизнеса.
                        </p>
                        <p>
                            В условиях стремительного роста цифровых технологий потребность в
                            трансформации затрагивает все сферы — от малого бизнеса до крупных корпораций.
                            Именно поэтому мы создаём решения, которые помогают компаниям адаптироваться,
                            оптимизировать процессы и открывать новые возможности.
                        </p>
                        <p>
                            Мы стремимся не просто внедрять технологии, а вдохновлять бизнес на развитие,
                            делая инновации простыми, понятными и эффективными.
                        </p>
                    </div>
                </Wrapper>
            </Container>

            <div
                className="absolute inset-x-0 bottom-0 h-[120px] bg-linear-to-t from-[#e6e6e6] to-transparent pointer-events-none"
                aria-hidden="true"
            />
        </header>
    );
};
