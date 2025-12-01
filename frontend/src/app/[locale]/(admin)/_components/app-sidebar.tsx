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
  TrendingUp,
  Megaphone,
  CheckSquare,
  ShieldCheck,
  Building2,
  Wrench,
  Users,
} from "lucide-react"
import { Routers } from "@/configs/router.config"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

export const menus = {
  navMain: [
    {
      title: "Дашборд",
      url: Routers.admin.dashboard,
      icon: LayoutDashboard,
    },
    {
      title: "Отдел продаж",
      icon: TrendingUp,
      items: [
        {
          title: "Лиды",
          url: Routers.admin.leads,
        },
      ],
    },
    {
      title: "Задачи",
      url: Routers.admin.tasks,
      icon: CheckSquare,
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
    {
      title: "Компания",
      url: Routers.admin.companies,
      icon: Building2,
    },
    {
      title: "Администрирование",
      icon: ShieldCheck,
      url: Routers.admin.dashboard + "#admin",
      items: [
        {
          title: "Роли",
          url: Routers.admin.roles,
        },
        {
          title: "Сотрудники",
          url: Routers.admin.employees,
          icon: Users
        },
      ],
    },
    {
      title: "Услуги",
      url: Routers.admin.services,
      icon: Wrench,
    }
  ],
}

export const AppSidebar = async () => {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-5">
            <Image className="w-full h-full" src={LogoImage} alt="Logo" />
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
