"use client";

import { pages } from "@/utils/pages";
import GoogleIcon from "@public/icons/google.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: pages.applications })}
      className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-semibold border-neutral-500 text-neutral-600 hover:ring-2 hover:border-neutral-600 hover:ring-neutral-300 dark:text-neutral-200 dark:border-neutral-400 hover:dark:ring-neutral-800 hover:dark:border-neutral-600 transition-all duration-300 cursor-pointer"
    >
      <Image src={GoogleIcon} height={24} width={24} alt="Google  icon" />
      <span> Login com o google</span>
    </button>
  );
};
