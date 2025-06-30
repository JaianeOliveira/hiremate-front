import { GlobalSidebar } from "@/components/general/global-sidebar";
import { LoggoutButton } from "@/components/general/loggout-button.stateful";
import { ToggleDarkModeButtonStateful } from "@/components/general/toggle-dark-mode-button/toggle-dark-mode-button.stateful";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { pages } from "@/utils/pages";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function layout(props: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(pages.login);
  }

  return (
    <div className="flex flex-col max-h-screen max-w-screen ">
      <SidebarProvider>
        <GlobalSidebar />

        <main className="relative overflow-auto w-full ">
          <SidebarTrigger className=" absolute top-10 left-10 " />
          <header className="flex items-center justify-between gap-4 py-4 px-[8vw] shadow-xs">
            <h1 className="uppercase font-semibold text-blue-500 ">Hiremate</h1>
            <div className="flex items-center gap-2 justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    height={24}
                    width={24}
                    alt={session?.user.name!}
                    src={session?.user.image!}
                    className="rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="md:w-56">
                  <DropdownMenuLabel>
                    Olá, {session?.user.name}!
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LoggoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {props.children}
        </main>
        <ToggleDarkModeButtonStateful />
      </SidebarProvider>
    </div>
  );
}
