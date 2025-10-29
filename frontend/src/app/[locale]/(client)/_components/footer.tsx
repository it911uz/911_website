import { Container } from "@/components/widgets/container"
import { Routers } from "@/configs/router.config"
import { Link } from "@/i18n/navigation"

export const Footer = () => {
    return <section data-slot="footer" className="bg-gray-04 py-12 md:py-20">
        <Container>
            <div className="space-y-8 md:space-y-16 max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-01">
                    ~ Изменим мир вместе!
                </p>

                <Link
                    className="text-5xl md:text-7xl lg:text-9xl font-normal relative transition-all duration-300 ease-in-out hover:font-black after:content-[''] after:w-0 after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all hover:after:w-full after:duration-300 block leading-tight"
                    href={Routers.contacts}
                >
                    Свяжитесь с нами
                </Link>
            </div>
        </Container>
    </section>
}