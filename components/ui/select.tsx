"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-white/10 bg-[#0b111d] px-3 text-sm text-white outline-none transition focus:border-primary focus:bg-[#0d1524] focus:ring-2 focus:ring-primary/25",
        className
      )}
      {...props}
    />
  );
}
