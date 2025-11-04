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

export const menus = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: LogoImage,
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

export const AppSidebar = () => {
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
        {/* <NavUser user={menus.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
