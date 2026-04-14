import Link from "next/link";
import { notFound } from "next/navigation";

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
          {topicDetails?.summary} Choose how you want to practice this topic
          first: coding problems or quick MCQs.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Link
          href={`/topics/${topic}/problems`}
          className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-teal-300"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal-700">
            Practice mode
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Coding problems
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Open the ordered list of {topicProblems.length} coding questions,
            then choose an individual problem to solve in the playground.
          </p>
          <span className="mt-6 inline-flex text-sm font-semibold text-teal-700 transition group-hover:translate-x-1">
            View coding problems
          </span>
        </Link>

        <Link
          href={`/topics/${topic}/mcqs`}
          className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-amber-300"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-700">
            Concept check
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">MCQs</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Review the topic through {topicMcqs.length} multiple-choice
            questions with difficulty labels and revealable answers.
          </p>
          <span className="mt-6 inline-flex text-sm font-semibold text-amber-700 transition group-hover:translate-x-1">
            View MCQs
          </span>
        </Link>
      </section>
    </main>
  );
}
