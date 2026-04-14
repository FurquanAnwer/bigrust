import Link from "next/link";

import { getMcqTopicSummaries } from "@/lib/mcqs";

export default function McqsPage() {
  const topicSummaries = getMcqTopicSummaries();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <section className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          MCQs
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Review Rust concepts with topic-wise multiple choice questions.
        </p>
      </section>

      <section className="space-y-4">
        {topicSummaries.map(({ slug, title, summary, count }, index) => (
          <Link
            key={slug}
            href={`/mcqs/${slug}`}
            className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-teal-300 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 font-mono text-sm font-semibold text-teal-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{summary}</p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
              {count} {count === 1 ? "MCQ" : "MCQs"}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
