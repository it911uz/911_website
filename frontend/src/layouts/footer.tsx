import { Container } from "@/components/widgets/container"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import type { ComponentProps, JSX } from "react"
import LogoImage from "@public/logo.svg"
import Image from "next/image"
import { Routers } from "@/configs/router.config"
import { FooterLinks } from "./_components/footer-links"
import { FooterLink } from "./_components/footer-link"
import { TargetLinks } from "@/configs/target-links.config"
import { getTranslations } from "next-intl/server"


export const Footer = async ({ className, ...props }: ComponentProps<"footer">) => {

    const currentYear = new Date().getFullYear();

    const t = await getTranslations("Footer");

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
                            <p className="text-lg font-bold ">
                                {t("requisite.title")}
                            </p>
                            <a href={`tel:${TargetLinks.phone}`} className="block">+998 (77) 443-33-35</a>
                            <a href={`mailto:${TargetLinks.email}`} className="block">
                                {TargetLinks.email}
                            </a>
                            <p className="pt-2">
                                {t("requisite.address")}
                            </p>
                        </div>
                    </div>

                    <FooterLinks title={t("map.title")}>
                        <FooterLink href={Routers.home}>{t("map.home")}</FooterLink>
                        <FooterLink href={Routers.about}>{t("map.about")}</FooterLink>
                        <FooterLink href={Routers.news}>{t("map.news")}</FooterLink>
                        <FooterLink href={Routers.contacts}>{t("map.contact")}</FooterLink>
                    </FooterLinks>

                    <FooterLinks title={t("services.title")}>
                        <FooterLink href={Routers.home + "#system"}>
                            {t("services.crm")}
                        </FooterLink>
                        <FooterLink href={Routers.home + "#site"}>{t("services.web")}</FooterLink>
                        <FooterLink href={Routers.home + "#bot"}>
                            {t("services.bots")}
                        </FooterLink>
                        <FooterLink href={`tel:${TargetLinks.phone}`}>{t("services.support")}</FooterLink>
                    </FooterLinks>

                    <FooterLinks title={t("info.title")}>
                        <FooterLink href={Routers.policy}>
                            {t("info.policy")}
                        </FooterLink>
                        <FooterLink href={Routers.policy}>
                            {t("info.terms")}
                        </FooterLink>
                        <FooterLink href={Routers.policy}>
                            {t("info.sales")}
                        </FooterLink>
                    </FooterLinks>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p className="text-center md:text-left">
                        {t.rich("copyright", {
                            copyright: () => <>&copy;</>,
                            year: () => <>{currentYear}</>
                        })}

                    </p>

                    <p className="mt-4 md:mt-0">
                        {t("love")}
                    </p>
                </div>

            </Container>
        </footer>
    )
}