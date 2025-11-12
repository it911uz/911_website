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
  Megaphone,
  Settings,
  Briefcase,
} from "lucide-react"
import { Routers } from "@/configs/router.config"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

export const menus = {
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
          title: "Роли",
          url: Routers.admin.roles,
        },
        {
          title: "Сотрудники",
          url: Routers.admin.employees,
        },
      ],
    },
    {
      title: "Маркетинг",
      url: Routers.admin.dashboard + "#marketing",
      icon: Megaphone,
      items: [
        {
          title: "Таргеты",
          url: Routers.admin.target,
        }
      ],
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
