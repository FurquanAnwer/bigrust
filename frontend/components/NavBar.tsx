"use client";

import Link from "next/link";

export function NavBar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center px-6 py-4 sm:px-8">
        <Link href="/" className="text-lg font-bold text-slate-950">
          BigRust
        </Link>
      </nav>
    </header>
  );
}
