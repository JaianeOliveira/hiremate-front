import { ToggleDarkModeButtonStateful } from "@/components/toggle-dark-mode-button/toggle-dark-mode-button.stateful";
import { pages } from "@/utils/pages";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="font-light text-2xl text-blue-500">Hiremate</h1>
        <Link href={pages.login}>Ir para minha conta</Link>
      </div>
      <ToggleDarkModeButtonStateful />
    </div>
  );
}
