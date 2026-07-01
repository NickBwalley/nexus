import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Bot, Code2, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { WaitlistForm } from "@/components/waitlist-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const providers = ["OpenAI", "Anthropic", "Gemini", "Cursor", "GitHub Copilot"];

const signals = [
  [BadgeDollarSign, "Cost visibility"],
  [LineChart, "Usage trends"],
  [ShieldCheck, "Budget control"],
  [Bot, "Provider insights"],
  [Code2, "Team activity"],
  [Sparkles, "Actionable reports"]
];

export default function Home() {
  return (
    <>
      <section className="grid-bg border-b border-white/10 py-20 md:py-28">
        <div className="container-nexus grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <Badge className="mb-5 border-blue-300/30 bg-blue-400/10 text-blue-200">Nexus</Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-white md:text-7xl">
              Understand and control your company&apos;s AI spending.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
              Track AI usage, monitor costs, and gain visibility across OpenAI, Anthropic, Gemini, Cursor, GitHub
              Copilot, and more, all from one place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/waitlist">
                  Join the Waitlist <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0b111d]/92 p-4 shadow-2xl shadow-black/30">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">AI Spend</p>
              <Badge className="text-emerald-200">live view</Badge>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-muted-foreground">This month</p>
              <p className="mt-2 text-5xl font-semibold text-white">$18,420</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
                <div className="h-full w-[64%] rounded-full bg-blue-400" />
              </div>
              <div className="mt-5 grid gap-3">
                {providers.map((provider, index) => (
                  <div key={provider} className="flex items-center justify-between rounded-md bg-white/[0.045] px-3 py-2">
                    <span className="text-sm text-slate-200">{provider}</span>
                    <span className="font-mono text-xs text-muted-foreground">{[42, 21, 16, 13, 8][index]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-nexus py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {signals.map(([Icon, label]) => (
            <div key={label as string} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
              <Icon className="mb-5 h-6 w-6 text-blue-300" />
              <p className="text-lg font-semibold text-white">{label as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="container-nexus pb-24">
        <div className="mx-auto max-w-3xl rounded-lg border border-blue-300/20 bg-blue-400/8 p-6 md:p-10">
          <Badge className="border-blue-300/30 text-blue-200">Early access</Badge>
          <h2 className="mt-4 text-3xl font-semibold text-white">Be one of the first teams to try Nexus.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Join the waitlist for early access, product updates, and the opportunity to help shape the future of AI cost
            management.
          </p>
          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </>
  );
}
