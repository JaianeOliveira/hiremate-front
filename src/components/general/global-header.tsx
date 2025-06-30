"use client";

import { PropsWithChildren } from "react";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export const GlobalHeader = ({ children }: PropsWithChildren) => {
  const { open } = useSidebar();
  return (
    <header
      className={`flex items-center justify-between gap-4 transition-all ${
        open ? "p-4" : "py-4 px-[4vw]"
      }`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="" />
        <h1
          className={`select-none leading-none uppercase font-semibold text-blue-500 ${
            open ? "opacity-0" : "opacity-100"
          } transition-all`}
        >
          Hiremate
        </h1>
      </div>
      {children}
    </header>
  );
};
