import Link from "next/link";
import { notFound } from "next/navigation";

import { McqPracticeList } from "@/components/McqPracticeList";
import { getMcqsByTopic } from "@/lib/mcqs";
import { topics } from "@/lib/problems";
import { getTopicBySlug } from "@/lib/topics";

type TopicMcqsPageProps = {
  params: Promise<{
    topic: string;
  }>;
};

export default async function TopicMcqsPage({ params }: TopicMcqsPageProps) {
  const { topic } = await params;

  if (!topics.includes(topic as (typeof topics)[number])) {
    notFound();
  }

  const topicDetails = getTopicBySlug(topic);
  const topicMcqs = getMcqsByTopic(topic);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <Link
        href={`/topics/${topic}`}
        className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
      >
        Back to {topicDetails?.title}
      </Link>

      <section className="mb-10 mt-6 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-700">
          Concept check
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          {topicDetails?.title} MCQs
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Answer the 40 multiple-choice questions below and reveal answers
          when you are ready to check your understanding.
        </p>
      </section>

      <McqPracticeList mcqs={topicMcqs} />
    </main>
  );
}
