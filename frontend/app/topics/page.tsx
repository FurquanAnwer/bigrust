import Link from "next/link";

import { getTopicSummaries } from "@/lib/problems";

export default function TopicsPage() {
  const topicSummaries = getTopicSummaries();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <section className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          Topics
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Choose a Rust concept and practice the problems grouped under it.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topicSummaries.map(({ topic, count }) => (
          <Link
            key={topic}
            href={`/topics/${topic}`}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-teal-300"
          >
            <h2 className="text-xl font-semibold text-slate-950">{topic}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {count} {count === 1 ? "problem" : "problems"}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
