import { LoggoutButton } from "@/components/loggout-button.stateful";
import { pages } from "@/utils/pages";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import console from "console";

export default async function layout(props: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session?.user) {
    redirect(pages.login);
  }

  return (
    <div className="flex flex-col max-h-screen max-w-screen ">
      <header className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-2">
          <h1>Hiremate</h1>
          <p className="text-sm">Olá, {session?.user.name}!</p>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <Image
            height={24}
            width={24}
            alt={session?.user.name!}
            src={session?.user.image!}
            className="rounded-full"
          />
          <LoggoutButton />
        </div>
      </header>
      <main className="overflow-auto">{props.children}</main>
    </div>
  );
}
