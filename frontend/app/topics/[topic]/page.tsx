import Link from "next/link";
import { notFound } from "next/navigation";

import { McqCard } from "@/components/McqCard";
import { ProblemCard } from "@/components/ProblemCard";
import { getMcqsByTopic } from "@/lib/mcqs";
import { getProblemsByTopic, topics } from "@/lib/problems";
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
  const topicProblems = getProblemsByTopic(topic);
  const topicMcqs = getMcqsByTopic(topic);

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
          {topicDetails?.summary} Work through the list: five coding questions,
          then five MCQs, each labeled by difficulty.
        </p>
      </section>

      <section className="mb-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal-700">
              Coding practice
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              5 coding questions
            </h2>
          </div>
        </div>

        <div className="space-y-5">
          {topicProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal-700">
            Concept check
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">5 MCQs</h2>
        </div>

        <div className="space-y-5">
          {topicMcqs.map((mcq, index) => (
            <McqCard key={mcq.id} mcq={mcq} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
