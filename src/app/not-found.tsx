import { pages } from "@/utils/pages";
import { Binoculars } from "lucide-react";
import Link from "next/link";

export default function NotFoudPage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <Binoculars
        strokeWidth={1.5}
        size={32}
        className="stroke-blue-500 dark:stroke-blue-300"
      />
      <p className="text-lg font-semibold text-blue-500 dark:text-blue-300">
        Ops, parece que essa página não existe.
      </p>
      <Link
        href={pages.applications}
        className="text-sm text-blue-500 underline underline-offset-2 hover:text-blue-600 transition-all duration-300 cursor-pointer"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
