"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <header
      className={
        isLandingPage
          ? "sticky top-0 z-50 border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl"
          : "border-b border-slate-200 bg-white"
      }
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4 sm:px-8">
        <Link
          href="/"
          className={`group inline-flex items-center gap-3 text-lg font-bold ${
            isLandingPage ? "text-white" : "text-slate-950"
          }`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-sm ${
              isLandingPage
                ? "border border-teal-200/25 bg-teal-300 text-black shadow-[0_0_30px_rgba(94,234,212,0.24)]"
                : "bg-slate-950 text-white"
            }`}
          >
            BR
          </span>
          <span>BigRust</span>
        </Link>

        <div
          className={`hidden items-center gap-6 text-sm font-semibold md:flex ${
            isLandingPage ? "text-neutral-300" : "text-slate-600"
          }`}
        >
          <Link
            href="/topics"
            className={
              isLandingPage
                ? "transition hover:text-teal-200"
                : "transition hover:text-teal-700"
            }
          >
            Roadmap
          </Link>
          <Link
            href="/mcqs"
            className={
              isLandingPage
                ? "transition hover:text-teal-200"
                : "transition hover:text-teal-700"
            }
          >
            MCQs
          </Link>
        </div>

        <Link
          href="/topics"
          className={
            isLandingPage
              ? "rounded-lg border border-teal-200/30 bg-teal-300 px-4 py-2 text-sm font-bold text-black transition hover:bg-teal-200"
              : "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
          }
        >
          Start
        </Link>
      </nav>
    </header>
  );
}
