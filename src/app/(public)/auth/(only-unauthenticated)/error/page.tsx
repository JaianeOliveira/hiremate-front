import { pages } from "@/utils/pages";
import { ShieldBan } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <ShieldBan
        strokeWidth={1.5}
        size={32}
        className="stroke-blue-500 dark:stroke-blue-300"
      />

      <p className="font-semibold text-blue-500 dark:text-blue-300">
        Não foi possivel te autenticar!
      </p>
      <Link
        href={pages.home}
        className="text-sm text-blue-500 underline underline-offset-2 hover:text-blue-600 transition-all duration-300 cursor-pointer"
      >
        Votar a página inicial
      </Link>
    </div>
  );
}
