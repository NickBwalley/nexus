import { WaitlistForm } from "@/components/waitlist-form";
import { Badge } from "@/components/ui/badge";

export default function WaitlistPage() {
  return (
    <div className="container-nexus py-16">
      <div className="mx-auto max-w-3xl">
        <Badge>Private MVP Access</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Join the Agentible Nexus waitlist.</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Tell us where AI costs, routing, caching, or governance are becoming painful for your engineering team.
        </p>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-5 md:p-8">
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}
