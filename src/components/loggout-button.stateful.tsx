"use client";

import { pages } from "@/utils/pages";
import { signOut } from "next-auth/react";

export const LoggoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: pages.home })}
      type="button"
      className="w-full text-left cursor-pointer"
    >
      Sair
    </button>
  );
};
