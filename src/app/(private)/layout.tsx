import { GlobalHeader } from "@/components/general/global-header";
import { GlobalSidebar } from "@/components/general/global-sidebar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarProvider } from "@/components/ui/sidebar";
import { pages } from "@/utils/pages";
import { Bell } from "lucide-react";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function layout(props: PropsWithChildren) {
  const cookieStore = await cookies();
  const sidebarIsOpen = cookieStore.get("sidebar_state")?.value === "true";

  const session = await getServerSession(authOptions);

  if (!session?.user) {
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
          {props.children}
        </main>
      </SidebarProvider>
    </div>
  );
}
