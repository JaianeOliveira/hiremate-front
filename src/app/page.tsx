import { pages } from "@/utils/pages";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow-lg flex items-center justify-between gap-4 py-4 px-[8vw]">
        <h1 className="text-lg uppercase font-semibold text-blue-500 ">
          Hiremate
        </h1>

        <Link
          href={pages.login}
          className="text-sm text-slate-700 dark:text-slate-200 hover:dark:text-blue-400 hover:text-blue-500 hover:underline hover:underline-offset-2 transition-all duration-300"
        >
          Acessar minha conta
        </Link>
      </header>
      <main className="cursor-default flex-1 flex flex-col">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-start justify-center bg-blue-500 dark:bg-transparent w-full h-[60vh] py-8 px-[8vw]">
          <h2 className="text-slate-200 text-xl font-semibold">
            Bem-vindo ao{" "}
            <span className="bg-slate-200 text-blue-500 dark:bg-blue-500 dark:text-slate-200 px-1">
              HireMate
            </span>
          </h2>
          <p className="text-slate-200 text-sm ">
            Controle suas candidaturas, acompanhe o progresso
            <br /> e otimize seu currículo.
          </p>
        </div>
      </main>
      <footer className="text-xs flex items-center justify-center gap-2 py-4 px-[8vw]">
        <p className=" text-slate-600 dark:text-slate-400">
          Desenvolvido por Jaiane Oliveira
        </p>
        <Link
          href="https://github.com/jaianeoliveira"
          className=" text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          GitHub
        </Link>
      </footer>
    </div>
  );
}
