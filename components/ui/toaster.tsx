"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type ToastState = { message: string; type: "success" | "error" } | null;

let setGlobalToast: ((toast: ToastState) => void) | null = null;

export function toast(message: string, type: "success" | "error" = "success") {
  setGlobalToast?.({ message, type });
}

export function Toaster() {
  const [toastState, setToastState] = useState<ToastState>(null);

  useEffect(() => {
    setGlobalToast = setToastState;
    return () => {
      setGlobalToast = null;
    };
  }, []);

  useEffect(() => {
    if (!toastState) return;
    const timer = window.setTimeout(() => setToastState(null), 3600);
    return () => window.clearTimeout(timer);
  }, [toastState]);

  if (!toastState) return null;

  const Icon = toastState.type === "success" ? CheckCircle2 : XCircle;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-lg border border-white/10 bg-[#0d1320] px-4 py-3 text-sm text-white shadow-2xl">
      <Icon className={toastState.type === "success" ? "h-5 w-5 text-emerald-300" : "h-5 w-5 text-red-300"} />
      <span>{toastState.message}</span>
    </div>
  );
}
