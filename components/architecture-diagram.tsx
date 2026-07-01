import { BarChart3, BrainCircuit, Braces, Database, Network, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const nodes = [
  { label: "Application", icon: Braces, detail: "SDK or API call" },
  { label: "Gateway", icon: Server, detail: "Policy and metadata" },
  { label: "Routing", icon: Network, detail: "Task-aware model choice" },
  { label: "Redis Cache", icon: Database, detail: "24h prompt reuse" },
  { label: "Selected LLM", icon: BrainCircuit, detail: "OpenAI provider" },
  { label: "Dashboard", icon: BarChart3, detail: "Spend and usage" }
];

export function ArchitectureDiagram({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <div className="grid gap-3 md:grid-cols-6">
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <div key={node.label} className="relative">
            <div
              className={cn(
                "h-full rounded-lg border border-white/10 bg-white/6 p-4 transition hover:border-blue-300/40 hover:bg-white/9",
                compact && "p-3"
              )}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-blue-400/12 text-blue-300">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-white">{node.label}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{node.detail}</p>
            </div>
            {index < nodes.length - 1 ? (
              <div className="absolute left-1/2 top-full h-3 w-px bg-white/20 md:left-full md:top-1/2 md:h-px md:w-3" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
