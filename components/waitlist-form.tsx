"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";

export function WaitlistForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setSuccess(false);

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
    setSuccess(true);
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <Input required name="name" placeholder="Full name" autoComplete="name" />
      <Input required name="email" type="email" placeholder="Work email" autoComplete="email" />
      <Input required name="company" placeholder="Company" autoComplete="organization" />
      <Input name="role" placeholder="Role (optional)" autoComplete="organization-title" />
      <Textarea name="suggestions" placeholder="Suggestions (optional)" />
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        Join the Waitlist
      </Button>
      {success ? (
        <div className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-50">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            <p>
              Thank you. You are on the waitlist, and we will prioritize your access as one of our first
              esteemed customers. Please check your email for confirmation and next steps.
            </p>
          </div>
        </div>
      ) : null}
      <p className="text-center text-xs text-muted-foreground">No spam. Early access only.</p>
    </form>
  );
}
