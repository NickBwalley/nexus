import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, Building2, CheckCircle2, Database, Factory, Rocket, ServerCog, ShieldCheck, Sparkles } from "lucide-react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { WaitlistForm } from "@/components/waitlist-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pains = [
  "AI spending grows unpredictably.",
  "Every team chooses different models.",
  "Expensive requests go unnoticed.",
  "Duplicate prompts waste money.",
  "Organizations lack visibility."
];

const features = [
  [ServerCog, "AI Gateway", "One controlled path for application prompts, metadata, policy, and provider execution."],
  [BrainCircuit, "Smart Model Routing", "Route reasoning-heavy work to premium models and routine work to efficient models."],
  [Database, "Prompt Caching", "Detect repeated requests and return fast cached responses with clear savings attribution."],
  [BarChart3, "Spend Analytics", "Track requests, tokens, latency, cost, cache hit rate, and model usage in one place."],
  [ShieldCheck, "Centralized Governance", "Create the foundation for policy, security, evaluation, and provider controls."]
];

const audiences = [
  [Rocket, "Startups"],
  [Building2, "Enterprise Teams"],
  [Sparkles, "AI Products"],
  [Factory, "Internal Engineering Platforms"]
];

export default function Home() {
  return (
    <>
      <section className="grid-bg border-b border-white/10 py-20 md:py-28">
        <div className="container-nexus grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Badge className="mb-5 border-blue-300/30 bg-blue-400/10 text-blue-200">Agentible Nexus MVP</Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-white md:text-7xl">
              The AI Control Plane for Engineering Teams
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Route every AI request through one intelligent gateway. Optimize model selection, reduce inference costs,
              improve cache efficiency, and gain complete visibility into AI usage across your engineering organization.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#waitlist">
                  Join the Waitlist <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/demo">View Interactive Demo</Link>
              </Button>
            </div>
          </div>
          <Card className="bg-[#0b111d]/92 p-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Gateway Trace</CardTitle>
                <Badge className="text-emerald-200">healthy</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {["ingest request", "route model", "cache lookup", "log cost"].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">{item}</span>
                  </div>
                  <span className="font-mono text-xs text-blue-200">{42 + index * 18}ms</span>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <Metric label="cache hit" value="34%" />
                <Metric label="savings" value="$812" />
                <Metric label="models" value="2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-nexus py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge>Problem</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">AI infrastructure is becoming a cost center before teams can govern it.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pains.map((pain) => (
              <div key={pain} className="rounded-lg border border-white/10 bg-white/5 p-4 text-muted-foreground">
                {pain}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-20">
        <div className="container-nexus">
          <Badge>Solution</Badge>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white md:text-4xl">
            Nexus sits between applications and LLM providers, making every request observable, optimizable, and reusable.
          </h2>
          <div className="mt-10">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      <section className="container-nexus py-20">
        <Badge>Core Capabilities</Badge>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {features.map(([Icon, title, text]) => (
            <Card key={title as string} className="bg-white/[0.045]">
              <CardHeader>
                <Icon className="h-6 w-6 text-blue-300" />
                <CardTitle>{title as string}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">{text as string}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-nexus pb-20">
        <div className="grid gap-4 md:grid-cols-4">
          {audiences.map(([Icon, title]) => (
            <div key={title as string} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <Icon className="mb-6 h-6 w-6 text-emerald-300" />
              <p className="text-xl font-semibold">{title as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="container-nexus pb-24">
        <div className="grid gap-8 rounded-lg border border-blue-300/20 bg-blue-400/8 p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge className="border-blue-300/30 text-blue-200">Private MVP</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-white">Build AI faster without losing control of cost and governance.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Join the early access list for engineering teams evaluating AI gateways, routing, caching, and spend visibility.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}

function Metric({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 p-3">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
  );
}
