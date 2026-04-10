import Link from "next/link";

import type { Problem } from "@/lib/problems";

type ProblemCardProps = {
  problem: Problem;
};

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link
      href={`/problems/${problem.id}`}
      className="group rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-card transition hover:-translate-y-1 hover:border-orange-300"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-orange-100 px-3 py-1 font-mono text-xs text-orange-700">
          {problem.id}
        </span>
        <span className="text-sm text-slate-500 transition group-hover:text-orange-700">
          Open problem
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900">{problem.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {problem.description}
      </p>

      <div className="mt-5 grid gap-3 rounded-2xl bg-slate-950 p-4 font-mono text-sm text-slate-100">
        <div>
          <div className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">
            Sample input
          </div>
          <pre className="whitespace-pre-wrap">{problem.sampleInput}</pre>
        </div>
        <div>
          <div className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">
            Sample output
          </div>
          <pre className="whitespace-pre-wrap text-emerald-300">
            {problem.sampleOutput}
          </pre>
        </div>
      </div>
    </Link>
  );
}

