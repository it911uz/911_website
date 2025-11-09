"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    MoreVertical,
    User,
    Bell,
    LogOut,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"

export const NavUser = () => {
    const { isMobile } = useSidebar();

    const session = useSession();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900"
                        >
                            <Avatar className="h-8 w-8 rounded-lg grayscale">
                                <AvatarImage src={session.data?.user.userEmail} alt={"/logo.svg"} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{session.data?.user.name || ""}</span>

                                <span className="text-gray-500 truncate text-xs">
                                    {session.data?.user.userEmail}
                                </span>
                            </div>

                            <MoreVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent

                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={session.data?.user.userEmail} alt={"/logo.svg"} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{session.data?.user.name}</span>

                                    <span className="text-gray-500 truncate text-xs">
                                        {session.data?.user.userEmail}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>

                                <User className="mr-2 size-4" />
                                Аккаунт
                            </DropdownMenuItem>
                            <DropdownMenuItem>

                                <Bell className="mr-2 size-4" />
                                Уведомления
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()}>

                            <LogOut className="mr-2 size-4" />
                            Выйти
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

interface Props {
    user: {
        name: string
        email: string
        avatar: string
    }
}