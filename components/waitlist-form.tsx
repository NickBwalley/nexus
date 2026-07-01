"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toaster";

export function WaitlistForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      toast("Check the form and try again.", "error");
      return;
    }

    toast("You are on the Nexus waitlist.");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <Input required name="email" type="email" placeholder="Work email" autoComplete="email" />
      <Input required name="company" placeholder="Company" autoComplete="organization" />
      <Input name="role" placeholder="Role (optional)" autoComplete="organization-title" />
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        Join the Waitlist
      </Button>
      <p className="text-center text-xs text-muted-foreground">No spam. Early access only.</p>
    </form>
  );
}
