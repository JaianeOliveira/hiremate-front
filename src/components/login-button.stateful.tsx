"use client";

import { pages } from "@/utils/pages";
import GoogleIcon from "@public/icons/google.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: pages.applications })}
      className="flex items-center gap-2 px-4 py-2 rounded-md border-2 text-sm font-semibold border-zinc-500 text-zinc-600 hover:ring-2 hover:border-zinc-600 hover:ring-zinc-300 dark:text-zinc-200 dark:border-zinc-400 hover:dark:ring-zinc-800 hover:dark:border-zinc-600 transition-all duration-300 cursor-pointer"
    >
      <Image src={GoogleIcon} height={24} width={24} alt="Google  icon" />
      <span> Login com o google</span>
    </button>
  );
};
