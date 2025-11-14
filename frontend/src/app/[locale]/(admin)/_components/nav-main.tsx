import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Link } from "@/i18n/navigation"

export const NavMain = ({ items }: Props) => {
    return items.map((item, index) => {
        const Icon = item.icon;

        return (
            <Accordion
                type="single"
                collapsible
                className="w-full"
                key={item.title}
            >
                {
                    (item.items?.length ?? 0) > 0 ? <>

                        <AccordionItem value={index.toString()}>
                            <AccordionTrigger className="text-md gap-2.5">
                                <div className="flex gap-2">
                                    <Icon />

                                    {
                                        item.title
                                    }
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <SidebarMenu className="py-1.5 pl-5">
                                    {item.items?.map((subItem) => {
                                        return <SidebarMenuItem className="py-0.5" key={subItem.title}>
                                            <SidebarMenuButton>
                                                <Link href={subItem.url} className="hover:text-orange-500 text-md">
                                                    {subItem.title}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    })}
                                </SidebarMenu>
                            </AccordionContent>
                        </AccordionItem>

                    </> : <>
                        <SidebarMenu className="px-4 text-lg">
                            <SidebarMenuItem className="px-0.5">
                                <Link href={item.url ?? "#!"} className="inline-flex items-center gap-2 hover:text-orange-500">
                                    <Icon />
                                    {item.title}
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </>
                }
            </Accordion>
        )
    })
}

interface Props {
    items: {
        title: string
        url?: string
        icon: any
        items?: {
            title: string
            url: string
        }[]
    }[]
}