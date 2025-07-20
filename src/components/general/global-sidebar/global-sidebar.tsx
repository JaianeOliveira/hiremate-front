import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { pages } from "@/utils/pages";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

import { ChartPie, LogOut, Send, User2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { UserInfoStateful } from "../user-info/user-info.stateful";

const items = [
  {
    title: "Dashboard",
    url: pages.dashboard,
    icon: () => <ChartPie strokeWidth={1.5} />,
  },
  {
    title: "Lista de candidaturas",
    url: pages.applications,
    icon: () => <Send strokeWidth={1.5} />,
  },
];

export async function GlobalSidebar() {
  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";
  const isMobile = /Android|iPhone|iPad|Mobile/.test(ua);

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="flex flex-row items-center justify-between p-4 ">
        <h1 className="select-none uppercase font-semibold text-blue-500  ">
          Hiremate
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-500 font-semibold">
            Candidaturas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="text-neutral-700 stroke-neutral-700 dark:text-neutral-300 dark:stroke-neutral-300"
                    >
                      <item.icon />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SidebarGroup>
          <SidebarGroupLabel className="text-blue-500 font-semibold">
            Currículo
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={pages.applications}
                    className="text-neutral-700 stroke-neutral-700 dark:text-neutral-300 dark:stroke-neutral-300"
                  >
                    <FileText strokeWidth={1.5} />
                    <span className="text-sm font-medium">
                      Otimizar currículo
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer" size="lg">
                  <UserInfoStateful />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side={isMobile ? "top" : "left"} align="end">
                <DropdownMenuItem className="cursor-pointer text-xs text-neutral-700 dark:text-neutral-300 w-full flex items-center justify-between gap-4 ">
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <User2 strokeWidth={1.2} size={16} />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  asChild
                  className="cursor-pointer text-xs w-full flex items-center justify-between gap-4 "
                >
                  <Link href={`/auth/logout`}>
                    <DropdownMenuLabel>Sair</DropdownMenuLabel>
                    <LogOut strokeWidth={1.2} size={16} />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
