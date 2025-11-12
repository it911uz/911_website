import { LinkButton } from "@/components/ui/link-button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { WebOrigin } from "@/const/web-origin.const";
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

export const AppHeader = () => {
    return (
        <header
            className={cn(
                "sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-b-gray-200 shadow-md bg-white"
            )}
        >
            <div className="flex w-full items-center px-4 lg:px-6">

                <SidebarTrigger className="-ml-1 mr-2" />


                <div className="ml-auto flex items-center gap-3">

                    <LinkButton className="text-lg" href={WebOrigin.client} size={"sm"} target="_blank">
                        <span>Перейти на сайт</span>
                        <ExternalLink className="ml-2 size-4" />
                    </LinkButton>
                </div>
            </div>
        </header>
    )
}