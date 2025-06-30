import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ToggleDarkModeButtonStateful } from "@/components/general/toggle-dark-mode-button/toggle-dark-mode-button.stateful";
import { pages } from "@/utils/pages";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(pages.applications);
  }

  return (
    <>
      {children}
      <ToggleDarkModeButtonStateful />
    </>
  );
}
