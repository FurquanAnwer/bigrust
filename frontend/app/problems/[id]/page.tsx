import Link from "next/link";
import { notFound } from "next/navigation";

import { CodePlayground } from "@/components/CodePlayground";
import { getProblemById } from "@/lib/problems";

type ProblemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { id } = await params;
  const problem = getProblemById(id);

  if (!problem) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10 sm:px-8">
      <Link
        href="/"
        className="inline-flex rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
      >
        Back to problems
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-card">
          <span className="rounded-full bg-orange-100 px-3 py-1 font-mono text-xs text-orange-700">
            {problem.id}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
            {problem.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {problem.description}
          </p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl bg-slate-950 p-4 font-mono text-sm text-slate-100">
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                Sample input
              </div>
              <pre className="whitespace-pre-wrap">{problem.sampleInput}</pre>
            </div>

            <div className="rounded-3xl bg-slate-950 p-4 font-mono text-sm text-emerald-300">
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                Sample output
              </div>
              <pre className="whitespace-pre-wrap">{problem.sampleOutput}</pre>
            </div>
          </div>
        </article>

        <CodePlayground problemTitle={problem.title} />
      </section>
    </main>
  );
}
