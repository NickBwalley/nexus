import Link from "next/link";
import { Activity, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/demo", label: "Demo" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/waitlist", label: "Waitlist" }
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060913]/78 backdrop-blur-xl">
      <div className="container-nexus flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-blue-300/30 bg-blue-400/12">
            <Activity className="h-5 w-5 text-blue-300" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white">Agentible Nexus</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Button key={link.href} asChild variant="ghost" size="sm">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <Button asChild variant="ghost" size="sm">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </nav>
        <Button asChild size="sm">
          <Link href="/waitlist">Join Waitlist</Link>
        </Button>
      </div>
    </header>
  );
}
