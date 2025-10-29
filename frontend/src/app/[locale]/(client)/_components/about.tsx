import { Wrapper } from "@/components/ui/wrapper"
import { Container } from "@/components/widgets/container"
import { AboutContent } from "./about-content"

export const About = () => {
    return <section data-slot="about" className="py-12 md:py-16">
        <Container>
            <Wrapper className="py-6 md:py-9 gap-6" column={1} md={2}>

                <h2 className="text-gray-600 text-2xl md:text-3xl font-bold tracking-wide">
                    ~  О Компании
                </h2>

                <AboutContent />
            </Wrapper>
        </Container>
    </section>
}