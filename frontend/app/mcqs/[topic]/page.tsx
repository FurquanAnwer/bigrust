import Link from "next/link";
import { notFound } from "next/navigation";

import { McqCard } from "@/components/McqCard";
import { getMcqsByTopic } from "@/lib/mcqs";
import { topics } from "@/lib/problems";

type McqTopicPageProps = {
  params: Promise<{
    topic: string;
  }>;
};

export default async function McqTopicPage({ params }: McqTopicPageProps) {
  const { topic } = await params;

  if (!topics.includes(topic as (typeof topics)[number])) {
    notFound();
  }

  const topicMcqs = getMcqsByTopic(topic);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <Link
        href="/mcqs"
        className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
      >
        Back to MCQs
      </Link>

      <section className="mb-10 mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          {topic} MCQs
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Practice {topic} with 10 focused multiple choice questions.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {topicMcqs.map((mcq, index) => (
          <McqCard key={mcq.id} mcq={mcq} index={index} />
        ))}
      </section>
    </main>
  );
}
