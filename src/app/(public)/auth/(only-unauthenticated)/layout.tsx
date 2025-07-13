import { COOKIE_ACCESS_TOKEN } from "@/config/cookies";
import { pages } from "@/utils/pages";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const hasAuthCookie = cookieStore.has(COOKIE_ACCESS_TOKEN);

  if (hasAuthCookie) {
    redirect(pages.applications);
  }

  return <>{children}</>;
}
