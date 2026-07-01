import { DashboardClient } from "@/components/dashboard-client";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="container-nexus py-16">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge>Analytics Dashboard</Badge>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">AI usage and spend visibility.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Monitor request volume, token usage, model mix, cache efficiency, and estimated savings.
          </p>
        </div>
      </div>
      <DashboardClient />
    </div>
  );
}
