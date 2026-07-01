import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="container-nexus py-16">
      <div className="mx-auto max-w-3xl">
        <Badge>Why Nexus?</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Why Nexus?</h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-muted-foreground">
          <p>AI adoption is accelerating, but most companies have little visibility into where their AI budget is going.</p>
          <p>
            Nexus gives engineering and IT teams a single place to monitor AI usage, control costs, and make informed
            decisions before spending becomes a problem.
          </p>
          <p>
            Built by{" "}
            <Link href="https://agentible.dev" target="_blank" rel="noreferrer" className="font-semibold text-white underline decoration-blue-300/50 underline-offset-4 hover:text-blue-200">
              Agentible
            </Link>
            , an AI infrastructure company focused on helping organizations deploy and manage AI at scale.
          </p>
        </div>
      </div>
    </div>
  );
}
