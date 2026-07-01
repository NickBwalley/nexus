import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-md border border-white/10 bg-[#0b111d] px-3 py-3 text-sm text-white caret-blue-300 outline-none transition placeholder:text-slate-500 focus:border-primary focus:bg-[#0d1524] focus:ring-2 focus:ring-primary/25",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
