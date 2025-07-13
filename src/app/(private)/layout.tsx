import { GlobalHeader } from "@/components/general/global-header/global-header";
import { GlobalSidebar } from "@/components/general/global-sidebar/global-sidebar";
import { PagesWrapper } from "@/components/general/pages-wrapper/pages-wrapper";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarProvider } from "@/components/ui/sidebar";
import { COOKIE_ACCESS_TOKEN } from "@/config/cookies";
import { pages } from "@/utils/pages";
import { Bell } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function layout(props: PropsWithChildren) {
  const cookieStore = await cookies();
  const sidebarIsOpen = cookieStore.get("sidebar_state")?.value === "true";

  const token = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value;

  if (!token) {
    redirect(pages.login);
  }

  return (
    <div className="flex flex-col max-h-screen max-w-screen ">
      <SidebarProvider defaultOpen={sidebarIsOpen}>
        <GlobalSidebar />

        <main className="relative overflow-auto w-full ">
          <GlobalHeader>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Bell className="stroke-blue-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" side="bottom">
                <p className="text-neutral-400 dark:text-neutral-500 text-xs italic text-center">
                  Você não tem nenhuma notificação!
                </p>
              </PopoverContent>
            </Popover>
          </GlobalHeader>
          <PagesWrapper>{props.children}</PagesWrapper>
        </main>
      </SidebarProvider>
    </div>
  );
}
