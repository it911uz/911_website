import { Container } from "@/components/widgets/container";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Fragment, type ComponentProps } from "react";
import LogoImage from "@public/logo.svg";
import { navigation } from "@/const/navigation.const";
import { getLocale } from "next-intl/server";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SwitchLang } from "./_components/switch-lang";
import { TargetLinks } from "@/configs/target-links.config";
import { Wrapper } from "@/components/ui/wrapper";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "./_components/mobile-menu";

export const Navigation = async ({ className, ...props }: ComponentProps<"nav">) => {
    const locale = await getLocale();

    return (
        <nav
            className={cn("bg-white py-3 shadow-md shadow-black/10 sticky top-0 z-50 left-0 right-0", className)}
            {...props}
        >
            <Container>
                
                <Wrapper className="flex justify-between items-center lg:grid xl:grid-cols-[290px_1fr_580px] lg:gap-5">
                    
                 
                    <Link href={Routers.home}>
                        <Image priority className="w-28 h-8 lg:w-32 lg:h-11" alt="Лого" src={LogoImage} />
                    </Link>
                    
                    <div className="hidden xl:flex justify-between items-center gap-5">
                        {
                            navigation.map((item) => (
                                <Fragment key={item.id}>
                                    {
                                        (item.children?.length ?? 0) > 0 ? (
                                            <Popover>
                                                <PopoverTrigger className="text-base shrink-0" hasIcon={(item.children?.length ?? 0) > 0}>
                                                    {item.name[locale]}
                                                </PopoverTrigger>
                                                <PopoverContent className="rounded-md p-0 shadow-lg">
                                                    <ul className="w-fit min-w-[200px]">
                                                        {
                                                            item.children?.map((child) => (
                                                                <li className="py-2 px-4 border-b border-b-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors" key={child.id}>
                                                                    <Link className="text-sm font-medium" href={child.path ?? "#!"}>
                                                                        {child.name[locale]}
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </PopoverContent>
                                            </Popover>
                                        ) : (
                                            <Link 
                                                className="text-base font-medium relative after:content-[''] after:w-0 after:h-0.5 after:bg-red-500 after:absolute after:bottom-0 after:left-0 after:transition-all hover:after:w-full after:duration-300" 
                                                href={item.path ?? "#!"}
                                            >
                                                {item.name[locale]}
                                            </Link>
                                        )
                                    }
                                </Fragment>
                            ))
                        }
                    </div>
                    
                    <div className="flex justify-end items-center gap-4 xl:gap-10">
                        
                        <SwitchLang />
                        
                        <a 
                            href={`tel:${TargetLinks.phone}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hidden xl:block"
                        >
                            <span className="text-xl font-semibold relative after:content-[''] after:w-0 after:h-0.5 after:bg-red-500 after:absolute after:bottom-0 after:left-0 after:transition-all hover:after:w-full after:duration-300">
                                +998 ( 77 ) 443-33-35
                            </span>
                        </a>
                        
                        <MobileMenu />
                    </div>
                </Wrapper>
            </Container>
        </nav>
    );
};