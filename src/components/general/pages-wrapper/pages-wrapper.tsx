"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export const PagesWrapper = (props: PropsWithChildren) => {
  const { open } = useSidebar();

  return (
    <div className={`transition-all ${open ? "p-4" : "py-4 px-[4vw]"}`}>
      {props.children}
    </div>
  );
};
