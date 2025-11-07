import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import LogoImage from "@public/logo.svg"
import {
  LayoutDashboard,
  LineChart,
  Users,
  ClipboardList,
  Megaphone,
  Settings,
  Briefcase,
} from "lucide-react"
import { Routers } from "@/configs/router.config"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { auth } from "@/auth"

export const menus = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/logo.svg",
  },
  navMain: [
    {
      title: "Дашбоард",
      url: Routers.admin.dashboard,
      icon: LayoutDashboard,
    },
    {
      title: "Отдел продаж",
      icon: LineChart,
      items: [
        {
          title: "Лиды",
          url: Routers.admin.leads,
        },
      ],
    },
    {
      title: "Администрирование",
      icon: Briefcase,
      url: Routers.admin.dashboard + "#admin",
      items: [
        {
          title: "Задачки",
          url: Routers.admin.tasks,
          icon: ClipboardList,
        },
        {
          title: "Клиенты",
          url: Routers.admin.clients,
          icon: Users,
        },
      ],
    },
    {
      title: "Маркетинг",
      url: Routers.admin.dashboard + "#marketing",
      icon: Megaphone,
    },
  ],
  navSecondary: [
    {
      title: "Настройки",
      url: "#",
      icon: Settings,
    },
  ],
}

export const AppSidebar = async () => {

  const session = await auth();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-5">
            <Image className="w-full h-full" src={LogoImage} alt="Logo" priority />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus.navMain} />
        {/* <NavSecondary items={menus.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          avatar: menus.user.avatar,
          email: session?.user.email || menus.user.email,
          name: session?.user.name || menus.user.name
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
