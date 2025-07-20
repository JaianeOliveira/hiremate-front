import { Button } from "@/components/ui/button";
import { pages } from "@/utils/pages";
import Hero from "@public/hero.svg";
import {
  BellPlus,
  ChartNoAxesCombined,
  ChevronRight,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-neutral-800 dark:text-neutral-200">
      <header className="shadow-xs flex items-center justify-between gap-4 py-4 px-[8vw]">
        <h1 className="text-lg uppercase font-semibold text-blue-500 ">
          Hiremate
        </h1>

        <Link href={pages.login}>
          <Button>Acessar minha conta</Button>
        </Link>
      </header>
      <main className="cursor-default flex-1 flex flex-col">
        <section className="grid grid-cols-1 md:grid-cols-2 items-center px-[8vw] min-h-[70vh] py-[8vh] gap-10 lg:gap-20">
          <div className="flex flex-col gap-8 order-2 md:order-1">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-medium">
              Gerencie suas candidaturas de forma eficiente
            </h2>
            <p>
              O Hiremate pode transformar sua busca por emprego. Com uma
              interface intuitiva, você acompanha todas as suas candidaturas em
              um só lugar.
            </p>

            <div className="flex gap-4">
              <Link href="#2">
                <Button>Saiba mais</Button>
              </Link>
              <Link href={pages.login}>
                <Button variant="outline">Criar minha conta</Button>
              </Link>
            </div>
          </div>

          <div className="min-h-[30vh] relative h-full w-full overflow-hidden order-1 md:order-2">
            <Image
              src={Hero}
              alt="Progress indicator image"
              fill
              className="object-contain"
            />
          </div>
        </section>

        <section
          id="2"
          className="bg-secondary px-[8vw] py-[8vh] text-center flex flex-col items-center gap-4"
        >
          <p className="font-heading font-medium">Recursos</p>
          <h2 className="text-3xl sm:text-5xl font-medium md:max-w-3/4">
            Descubra as funcionalidades do Hiremate
          </h2>

          <p className="mt-4 md:max-w-3/4">
            Acomanhe cada etapa de suas candidaturas de forma simples e
            organizada. Com um painel intuitivo, você pode visualizar o status
            de cada vaga e receber lembretes para não perder prazos importantes.
            Assim, você se concentra no que realmente importa: conseguir o
            emprego dos seus sonhos.
          </p>

          <div className="grid md:grid-cols-3 gap-20 mt-20">
            <div className="flex flex-col gap-6 items-center">
              <Send size={32} />
              <h3 className="text-xl sm:text-3xl font-medium">
                Gerenciamento de Candidaturas Simplificado
              </h3>
              <p>Organize suas candidaturas em um só lugar.</p>
            </div>

            <div className="flex flex-col gap-6 items-center">
              <BellPlus size={32} />
              <h3 className="text-xl sm:text-3xl font-medium">
                Notificações em Tempo Real
              </h3>
              <p>Receba alertas sobre atualizações de suas candidaturas.</p>
            </div>

            <div className="flex flex-col gap-6 items-center">
              <ChartNoAxesCombined size={32} />
              <h3 className="text-xl sm:text-3xl font-medium">
                Relatórios de Desempenho Personalizados{" "}
              </h3>
              <p>Analise seu progresso e melhore suas estratégias.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <Link href="#3">
              <Button variant="outline">Saiba mais</Button>
            </Link>
            <Link target="_blank" href="mailto:jaianeoliveira.dev@gmail.com">
              <Button variant="ghost">
                Tirar minhas dúvidas
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </section>

        <section
          id="3"
          className="bg-[#2265CC] text-neutral-100  flex flex-col items-center justify-center text-center px-[8vw] min-h-[70vh] py-[8vh] gap-8"
        >
          <h2 className="md:max-w-3/5 text-4xl sm:text-5xl lg:text-7xl font-medium">
            Transforme sua busca por emprego
          </h2>
          <p className="md:max-w-3/5">
            Crie sua conta agora e comece a gerenciar suas candidaturas de forma
            eficiente e prática.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link href={pages.login}>
              <Button variant="secondary">Criar minha conta</Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="text-xs flex items-center flex-wrap gap-2 py-4 px-[8vw] border-t border-muted">
        <p className=" text-neutral-600 dark:text-neutral-400">
          &copy; 2025 Hiremate. Desenvolvido por Jaiane Oliveira |
        </p>

        <div className="flex items-center justify-end gap-4">
          <Link
            href="https://github.com/jaianeoliveira"
            className=" text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            GitHub
          </Link>

          <Link
            href="https://linkedin.com/in/jaianeoliveira"
            className=" text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            Linkedin
          </Link>
          <Link
            href="https://jaianeoliveira.com"
            className=" text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            Portfólio
          </Link>
        </div>
      </footer>
    </div>
  );
}
