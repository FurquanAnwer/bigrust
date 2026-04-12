import { ProblemCard } from "@/components/ProblemCard";
import { problems } from "@/lib/problems";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <section className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          BigRust – Practice Rust
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Pick a beginner-friendly Rust problem, practice the core concept, and
          run your solution in the playground.
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
