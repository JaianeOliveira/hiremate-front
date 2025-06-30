"use client";
import { pages } from "@/utils/pages";
import { signOut } from "next-auth/react";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export const LoggoutButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, ...rest }, ref) => (
    <button
      ref={ref}
      className={`
        w-full 
        flex items-center justify-between gap-4 
        text-xs text-slate-700 dark:text-slate-300
        ${className || ""}  
      `}
      onClick={() => signOut({ callbackUrl: pages.home, redirect: true })}
      {...rest}
    >
      <span>Sair</span>
    </button>
  )
);
LoggoutButton.displayName = "LoggoutButton";
