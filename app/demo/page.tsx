import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Playground } from "@/components/playground";
import { Badge } from "@/components/ui/badge";

export default function DemoPage() {
  return (
    <div className="container-nexus py-16">
      <Badge>Interactive Demo</Badge>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white md:text-6xl">
        Watch Nexus route, cache, price, and log an AI request.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        The demo runs without credentials using realistic responses. Add OpenAI, Supabase, and Upstash keys to turn the
        same flow into a live gateway.
      </p>
      <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.035] p-4">
        <ArchitectureDiagram compact />
      </div>
      <div className="mt-8">
        <Playground />
      </div>
    </div>
  );
}
