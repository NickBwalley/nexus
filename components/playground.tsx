"use client";

import { FormEvent, useState } from "react";
import { Loader2, SendHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { currency, numberFormat } from "@/lib/utils";

type GatewayResponse = {
  response: string;
  model: string;
  cacheHit: boolean;
  estimatedCost: number;
  latencyMs: number;
  totalTokens: number;
};

export function Playground() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GatewayResponse | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/gateway", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries()))
    });

    setLoading(false);
    if (response.ok) {
      setResult(await response.json());
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Gateway Playground</CardTitle>
          <p className="text-sm text-muted-foreground">Send a prompt through Nexus and inspect the routing decision.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <Input name="userEmail" type="email" defaultValue="demo@agentible.ai" />
            <Select name="taskType" defaultValue="architecture">
              <option value="planning">Planning</option>
              <option value="architecture">Architecture</option>
              <option value="reasoning">Reasoning</option>
              <option value="coding">Coding</option>
              <option value="debugging">Debugging</option>
              <option value="refactoring">Refactoring</option>
              <option value="summary">Summary</option>
              <option value="documentation">Documentation</option>
              <option value="extraction">Extraction</option>
              <option value="classification">Classification</option>
            </Select>
            <Textarea
              name="prompt"
              defaultValue="Design a cost-aware AI gateway for a product team running support summaries, code review, and planning workflows."
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
              Send Request
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-[#0b111d]/90">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Execution Result</CardTitle>
            {result ? <Badge>{result.cacheHit ? "Cache hit" : "Fresh completion"}</Badge> : null}
          </div>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-4">
                <ResultMetric label="Model" value={result.model} />
                <ResultMetric label="Cost" value={currency(result.estimatedCost)} />
                <ResultMetric label="Latency" value={`${result.latencyMs}ms`} />
                <ResultMetric label="Tokens" value={numberFormat(result.totalTokens)} />
              </div>
              <pre className="min-h-56 whitespace-pre-wrap rounded-lg border border-white/10 bg-black/25 p-4 text-sm leading-6 text-slate-200">
                {result.response}
              </pre>
            </div>
          ) : (
            <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-white/15 text-center text-sm text-muted-foreground">
              Gateway output appears here after a request is sent.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ResultMetric({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 p-3">
      <p className="break-words text-sm font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    </div>
  );
}
