import { ProblemCard } from "@/components/ProblemCard";
import { problems } from "@/lib/problems";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10 sm:px-8">
      <section className="mb-10 max-w-3xl">
        <span className="inline-flex rounded-full border border-orange-200 bg-white/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.25em] text-orange-700">
          Rust Practice
        </span>
        <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-950">
          Solve tiny Rust problems in a clean, minimal playground.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Pick a problem, write some Rust, and run it through the backend with
          Judge0. Everything is hardcoded on purpose so the app stays simple.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </section>
    </main>
  );
}

