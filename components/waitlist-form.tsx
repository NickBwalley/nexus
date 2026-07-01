"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

    toast("You are on the Agentible Nexus waitlist.");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <Input required name="name" placeholder="Name" />
        <Input required name="email" type="email" placeholder="Email" />
        <Input required name="company" placeholder="Company" />
        <Input required name="role" placeholder="Role" />
        <Select required name="teamSize" defaultValue="">
          <option value="" disabled>
            Team size
          </option>
          <option>1-10</option>
          <option>11-50</option>
          <option>51-200</option>
          <option>201-1000</option>
          <option>1000+</option>
        </Select>
        <Select required name="provider" defaultValue="">
          <option value="" disabled>
            Current AI provider
          </option>
          <option>OpenAI</option>
          <option>Anthropic</option>
          <option>Google</option>
          <option>Azure OpenAI</option>
          <option>Multiple providers</option>
          <option>Not yet using AI</option>
        </Select>
      </div>
      <Textarea required name="challenge" placeholder="Biggest AI cost or governance challenge" />
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        Join the Waitlist
      </Button>
    </form>
  );
}
