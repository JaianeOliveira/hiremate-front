"use client";

import { api } from "@/lib/axios";
import { pages } from "@/utils/pages";
import { Plane } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogoutPage() {
  const [shouldShowBackUrl, setShouldShowBackUrl] = useState(false);
  const router = useRouter();

  const handleRemoveCookie = async () => {
    api.post("/auth/logout");
    router.replace(pages.home);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShouldShowBackUrl(true), 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    handleRemoveCookie();
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <Plane
        size={32}
        strokeWidth={1.5}
        className="animate-bounce stroke-blue-500 dark:stroke-blue-300"
      />

      <p className="text-lg font-semibold text-blue-500 dark:text-blue-300">
        Saindo...
      </p>

      <>
        <p
          className={`text-sm text-center text-blue-500 dark:text-blue-300 ${
            shouldShowBackUrl ? "opacity-100" : "opacity-0"
          } transition-all duration-300`}
        >
          Parece que isso está demorando.
        </p>

        <Link
          href={pages.home}
          className={`text-sm text-center text-blue-500 underline underline-offset-2 hover:text-blue-600   transition-all duration-300 cursor-pointer ${
            shouldShowBackUrl ? "opacity-100" : "opacity-0"
          } transition-all duration-300}`}
        >
          Clique aqui para voltar a página inicial
        </Link>
      </>
    </div>
  );
}
