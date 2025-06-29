import { ToggleDarkModeButtonStateful } from "@/components/toggle-dark-mode-button/toggle-dark-mode-button.stateful";
import { pages } from "@/utils/pages";
import console from "console";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function layout(props: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session?.user) {
    redirect(pages.login);
  }

  return (
    <div className="flex flex-col max-h-screen max-w-screen ">
      <header className="flex items-center justify-between gap-4 py-4 px-[8vw] shadow-xs">
        <h1 className="uppercase font-semibold text-blue-500 ">Hiremate</h1>
        <div className="flex items-center gap-2 justify-end">
          <Image
            height={24}
            width={24}
            alt={session?.user.name!}
            src={session?.user.image!}
            className="rounded-full"
          />
        </div>
      </header>
      <main className="overflow-auto">{props.children}</main>
      <ToggleDarkModeButtonStateful />
    </div>
  );
}
