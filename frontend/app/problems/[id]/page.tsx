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
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <Link
        href={`/topics/${problem.topic}`}
        className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
      >
        Back to {problem.topicTitle}
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-md bg-teal-50 px-3 py-1 font-mono text-xs text-teal-700">
              {problem.topicTitle}
            </span>
            <span className="rounded-md bg-amber-50 px-3 py-1 font-mono text-xs text-amber-700">
              {problem.difficulty}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
            {problem.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {problem.description}
          </p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-lg bg-zinc-950 p-4 font-mono text-sm text-slate-100">
              <div className="mb-2 text-xs uppercase text-slate-400">
                Sample input
              </div>
              <pre className="whitespace-pre-wrap">{problem.sampleInput}</pre>
            </div>

            <div className="rounded-lg bg-zinc-950 p-4 font-mono text-sm text-emerald-300">
              <div className="mb-2 text-xs uppercase text-slate-400">
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
