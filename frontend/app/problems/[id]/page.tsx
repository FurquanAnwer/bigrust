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
    <main className="min-h-[calc(100vh-65px)] bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-4">
          <Link
            href={`/topics/${problem.topic}/problems`}
            className="inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
          >
            Back to {problem.topicTitle} problems
          </Link>
          <div className="hidden text-sm font-medium text-slate-500 sm:block">
            BigRust coding workspace
          </div>
        </div>
      </div>

      <section className="mx-auto grid max-w-[110rem] gap-3 p-3 lg:h-[calc(100vh-118px)] lg:grid-cols-[minmax(360px,0.95fr)_minmax(520px,1.25fr)]">
        <article className="overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-3">
            <p className="text-sm font-semibold text-slate-700">Description</p>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-md bg-teal-50 px-3 py-1 font-mono text-xs text-teal-700">
                {problem.topicTitle}
              </span>
              <span className="rounded-md bg-amber-50 px-3 py-1 font-mono text-xs text-amber-700">
                {problem.difficulty}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              {problem.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-700">
              {problem.description}
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-950">Example input</h2>
                <pre className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
                  {problem.sampleInput || "(empty input)"}
                </pre>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-950">Expected output</h2>
                <pre className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-emerald-700">
                  {problem.sampleOutput}
                </pre>
              </div>
            </div>
          </div>
        </article>

        <CodePlayground problemTitle={problem.title} />
      </section>
    </main>
  );
}
