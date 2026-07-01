import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roadmap = ["AI Gateway", "AI Analytics", "AI Governance", "AI Security", "AI Evaluation"];

export default function AboutPage() {
  return (
    <div className="container-nexus py-16">
      <Badge>About Agentible</Badge>
      <div className="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="text-4xl font-semibold text-white md:text-6xl">Agentible is an AI infrastructure company.</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our mission is to build the foundational infrastructure layer that helps organizations deploy, optimize,
            govern, and scale AI systems.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nexus is the first product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-muted-foreground">
            <p>
              Agentible Nexus gives engineering teams a control plane for model routing, prompt caching, cost visibility,
              and usage analytics before AI consumption spreads across dozens of applications.
            </p>
            <p>
              The long-term vision is to become the operating layer for enterprise AI infrastructure, with governance,
              security, and evaluation built into every request path.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-5">
        {roadmap.map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-blue-200">Future</p>
            <p className="mt-4 text-xl font-semibold text-white">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
