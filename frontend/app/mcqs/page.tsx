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

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topicSummaries.map(({ topic, count }) => (
          <Link
            key={topic}
            href={`/mcqs/${topic}`}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-teal-300"
          >
            <h2 className="text-xl font-semibold text-slate-950">{topic}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {count} {count === 1 ? "MCQ" : "MCQs"}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
