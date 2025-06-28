import { pages } from "@/utils/pages";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-4  items-center justify-center h-screen">
      <p>Não foi possivel te autenticar!</p>
      <Link
        href={pages.home}
        className="underline underline-offset-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
      >
        Votar a página inicial
      </Link>
    </div>
  );
}
