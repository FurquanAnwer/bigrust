import Link from "next/link";
import { notFound } from "next/navigation";

import { TopicPracticeOptions } from "@/components/TopicPracticeOptions";
import { topics } from "@/lib/problems";
import { getTopicBySlug } from "@/lib/topics";

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

  const topicDetails = getTopicBySlug(topic);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <Link
        href="/"
        className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
      >
        Back to roadmap
      </Link>

      <section className="mb-10 mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          {topicDetails?.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          {topicDetails?.summary} Choose how you want to practice this topic
          first: coding problems or quick MCQs.
        </p>
      </section>

      <TopicPracticeOptions topic={topic} />
    </main>
  );
}
