import type { Mcq } from "@/lib/mcqs";

type McqCardProps = {
  mcq: Mcq;
  index: number;
};

export function McqCard({ mcq, index }: McqCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-teal-50 px-3 py-1 font-mono text-xs text-teal-700">
          {mcq.topic}
        </span>
        <span className="text-sm text-slate-500">Question {index + 1}</span>
      </div>

      <h2 className="text-lg font-semibold leading-7 text-slate-950">
        {mcq.question}
      </h2>

      <ul className="mt-4 space-y-2">
        {mcq.options.map((option) => (
          <li
            key={option}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            {option}
          </li>
        ))}
      </ul>

      <details className="mt-4 rounded-lg border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-900">
        <summary className="cursor-pointer font-semibold">Show answer</summary>
        <p className="mt-2">{mcq.answer}</p>
      </details>
    </article>
  );
}
