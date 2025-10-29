import { Container } from "@/components/widgets/container"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"
import LogoImage from "@public/logo.svg"
import Image from "next/image"
import { Routers } from "@/configs/router.config"
import { FooterLinks } from "./_components/footer-links"
import { FooterLink } from "./_components/footer-link"
import { TargetLinks } from "@/configs/target-links.config"


export const Footer = ({ className, ...props }: ComponentProps<"footer">) => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className={cn("bg-gray-04 py-16 md:py-24", className)} {...props}>
            <Container>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 border-b border-gray-700 pb-12 mb-8">
                    <div className="col-span-2 space-y-8">
                        <div>
                            <Link href={Routers.home}>

                                <Image priority src={LogoImage} alt="Лого IT 911" width={150} height={30} />
                            </Link>
                        </div>

                        <div className="space-y-2 text-sm">
                            <p className="text-lg font-bold ">Свяжитесь с нами</p>
                            <a href={`tel:${TargetLinks.phone}`} className="block">+998 90 123 45 67</a>
                            <a href={`mailto:${TargetLinks.email}`} className="block">
                                {TargetLinks.email}
                            </a>
                            <p className="pt-2">
                                Chorsu MFY, 4 дом, 135 квартира
                            </p>
                        </div>
                    </div>

                    <FooterLinks title="Карта сайта">
                        <FooterLink href={Routers.home}>Главная</FooterLink>
                        <FooterLink href={Routers.home}>О нас</FooterLink>
                        <FooterLink href={Routers.home}>Новости</FooterLink>
                        <FooterLink href={Routers.home}>Контакты</FooterLink>
                    </FooterLinks>

                    <FooterLinks title="Наши услуги">
                        <FooterLink href={Routers.home + "#system"}>CRM-системы</FooterLink>
                        <FooterLink href={Routers.home + "#site"}>Веб-разработка</FooterLink>
                        <FooterLink href={Routers.home + "#bot"}>Чат-боты</FooterLink>
                        <FooterLink href={Routers.home}>Поддержка</FooterLink>
                    </FooterLinks>

                    <FooterLinks title="Правовая информация">
                        <FooterLink href={Routers.offers}>Публичная оферта</FooterLink>
                        <FooterLink href={Routers.offers}>Политика конфиденциальности</FooterLink>
                        <FooterLink href={Routers.home}>Тендеры</FooterLink>
                        <FooterLink href={Routers.home}>Вакансии</FooterLink>
                    </FooterLinks>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>
                        &copy; 2024-{currentYear} (c) ООО IT 911. Все права защищены.
                    </p>
                    <p className="mt-4 md:mt-0">

                        Сделано с любовью для вашего бизнеса
                    </p>
                </div>

            </Container>
        </footer>
    )
}