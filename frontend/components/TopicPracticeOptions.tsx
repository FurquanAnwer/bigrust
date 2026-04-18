"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getBackendQuestionCounts,
  type TopicQuestionCount
} from "@/lib/backendQuestions";

type TopicPracticeOptionsProps = {
  topic: string;
};

export function TopicPracticeOptions({ topic }: TopicPracticeOptionsProps) {
  const [counts, setCounts] = useState<TopicQuestionCount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    async function loadCounts() {
      setIsLoading(true);

      try {
        const nextCounts = await getBackendQuestionCounts();

        if (isCurrent) {
          setCounts(nextCounts.find((count) => count.topic === topic) ?? null);
        }
      } catch {
        if (isCurrent) {
          setCounts(null);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadCounts();

    return () => {
      isCurrent = false;
    };
  }, [topic]);

  const problemLabel = isLoading
    ? "Loading coding questions..."
    : `${counts?.problemCount ?? 0} coding questions`;
  const mcqLabel = isLoading ? "Loading MCQs..." : `${counts?.mcqCount ?? 0} MCQs`;

  return (
    <section className="grid gap-5 md:grid-cols-2">
      <Link
        href={`/topics/${topic}/problems`}
        className="group rounded-lg border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-teal-300"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal-700">
          Practice mode
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-950">
          Coding problems
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Open the ordered list of {problemLabel}, then choose an individual
          problem to solve in the playground.
        </p>
        {isLoading ? (
          <span className="mt-5 inline-flex h-2 w-32 animate-pulse rounded bg-teal-100" />
        ) : null}
        <span className="mt-6 inline-flex text-sm font-semibold text-teal-700 transition group-hover:translate-x-1">
          View coding problems
        </span>
      </Link>

      <Link
        href={`/topics/${topic}/mcqs`}
        className="group rounded-lg border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-amber-300"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-700">
          Concept check
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-950">MCQs</h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Review the topic through {mcqLabel} with difficulty labels and
          revealable answers.
        </p>
        {isLoading ? (
          <span className="mt-5 inline-flex h-2 w-24 animate-pulse rounded bg-amber-100" />
        ) : null}
        <span className="mt-6 inline-flex text-sm font-semibold text-amber-700 transition group-hover:translate-x-1">
          View MCQs
        </span>
      </Link>
    </section>
  );
}
