"use client";

import { pages } from "@/utils/pages";
import { signOut } from "next-auth/react";

export const LoggoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: pages.home })}
      type="button"
      className="flex items-center gap-2 px-4 py-1 rounded-md border-2 text-sm font-semibold border-slate-500 text-slate-600 hover:ring-2 hover:border-rose-400 hover:text-rose-400 hover:ring-rose-300 transition-all duration-300 cursor-pointer"
    >
      Sair
    </button>
  );
};
