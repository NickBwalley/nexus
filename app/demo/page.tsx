import { BadgeDollarSign, ChartNoAxesCombined, Lightbulb, LineChart, Radar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const items = [
  [BadgeDollarSign, "Monitor AI spending in real time"],
  [Radar, "Track usage across providers"],
  [LineChart, "Identify cost trends"],
  [ChartNoAxesCombined, "Optimize AI budgets"],
  [Lightbulb, "Receive actionable insights"]
];

export default function DemoPage() {
  return (
    <div className="container-nexus py-16">
      <div className="mx-auto max-w-4xl">
        <Badge>Demo</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">See Nexus in action</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Explore how Nexus helps teams:</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {items.map(([Icon, label]) => (
            <div key={label as string} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <Icon className="h-5 w-5 shrink-0 text-blue-300" />
              <p className="text-white">{label as string}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-blue-300/20 bg-blue-400/8 p-6 text-xl font-semibold text-white">
          Interactive demo coming soon.
        </div>
      </div>
    </div>
  );
}
