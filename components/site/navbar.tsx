"use client";

import Link from "next/link";
import { Activity, Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/demo", label: "Demo" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/waitlist", label: "Waitlist" }
] as const;

const githubUrl = "https://github.com/NickBwalley/nexus";

export function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060913]/78 backdrop-blur-xl">
      <div className="container-nexus flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-blue-300/30 bg-blue-400/12">
            <Activity className="h-5 w-5 text-blue-300" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white">Nexus</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Button key={link.href} asChild variant="ghost" size="sm">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <Button asChild variant="ghost" size="sm">
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-[#0b111d] text-white md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-16 z-30 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none"
        )}
        onClick={closeMenu}
      />
      <aside
        className={cn(
          "fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-[min(88vw,22rem)] border-l border-white/10 bg-[#080d17] p-5 shadow-2xl transition duration-300 ease-out md:hidden",
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <nav className="grid gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/8"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/8"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <Button asChild className="mt-3 w-full">
            <Link href="/waitlist" onClick={closeMenu}>
              Join Waitlist
            </Link>
          </Button>
        </nav>
      </aside>
    </header>
  );
}
