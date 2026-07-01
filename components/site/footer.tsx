import Link from "next/link";

const internalLinks = [
  ["Product", "/demo"],
  ["About", "/about"],
  ["Waitlist", "/waitlist"]
] as const;

const externalLinks = [
  ["Documentation (Coming Soon)", "#"],
  ["Privacy", "#"],
  ["Contact", "mailto:hello@agentible.ai"]
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-nexus flex flex-col gap-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          Nexus, powered by{" "}
          <a href="https://agentible.dev" target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-blue-200">
            Agentible
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-4">
          {internalLinks.map(([label, href]) => (
            <Link key={label} href={href} className="hover:text-white">
              {label}
            </Link>
          ))}
          {externalLinks.map(([label, href]) => (
            <a key={label} href={href} className="hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
