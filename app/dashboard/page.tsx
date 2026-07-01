import { BadgeDollarSign, ChartPie, LineChart, RadioTower, UsersRound, WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  [WalletCards, "AI Spend Overview"],
  [LineChart, "Usage Analytics"],
  [ChartPie, "Cost Breakdown"],
  [RadioTower, "Provider Insights"],
  [UsersRound, "Team Activity"],
  [BadgeDollarSign, "Weekly Reports"]
];

export default function DashboardPage() {
  return (
    <div className="container-nexus py-16">
      <div className="mx-auto max-w-4xl">
        <Badge>Dashboard</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Everything you need in one place</h1>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {features.map(([Icon, label]) => (
            <div key={label as string} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <Icon className="h-5 w-5 shrink-0 text-blue-300" />
              <p className="text-white">{label as string}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg leading-8 text-muted-foreground">
          More capabilities will be added as we work closely with our early users.
        </p>
      </div>
    </div>
  );
}
