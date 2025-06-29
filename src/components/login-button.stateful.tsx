"use client";

import { pages } from "@/utils/pages";
import GoogleIcon from "@public/icons/google.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: pages.applications })}
      className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-semibold border-slate-500 text-slate-600 hover:ring-2 hover:border-slate-600 hover:ring-slate-300 dark:text-slate-200 dark:border-slate-400 hover:dark:ring-slate-800 hover:dark:border-slate-600 transition-all duration-300 cursor-pointer"
    >
      <Image src={GoogleIcon} height={24} width={24} alt="Google  icon" />
      <span> Login com o google</span>
    </button>
  );
};
