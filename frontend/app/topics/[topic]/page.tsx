import Link from "next/link";
import { notFound } from "next/navigation";

import { ProblemCard } from "@/components/ProblemCard";
import { getProblemsByTopic, topics } from "@/lib/problems";

type TopicPageProps = {
  params: Promise<{
    topic: string;
  }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;

  if (!topics.includes(topic as (typeof topics)[number])) {
    notFound();
  }

  const topicProblems = getProblemsByTopic(topic);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <Link
        href="/topics"
        className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
      >
        Back to topics
      </Link>

      <section className="mb-10 mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          {topic}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Practice {topic} with focused beginner Rust problems.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {topicProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </section>
    </main>
  );
}
