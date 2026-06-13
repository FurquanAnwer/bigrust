"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getBackendMcqTopicSummaries,
  type TopicQuestionSummary
} from "@/lib/backendQuestions";
import { getMcqTopicSummaries } from "@/lib/mcqs";

export function McqTopicList() {
  const [topicSummaries, setTopicSummaries] = useState<TopicQuestionSummary[]>(
    getMcqTopicSummaries()
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    async function loadSummaries() {
      setIsLoading(true);

      try {
        const summaries = await getBackendMcqTopicSummaries();

        if (isCurrent) {
          setTopicSummaries(summaries);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadSummaries();

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <section className="space-y-4">
      {topicSummaries.map(({ slug, title, summary, count }, index) => (
        <Link
          key={slug}
          href={`/mcqs/${slug}`}
          className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-teal-300 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 font-mono text-sm font-semibold text-teal-700">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">{summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Easy", "Medium", "Hard"].map((difficulty) => (
                <span
                  key={difficulty}
                  className="rounded-md bg-amber-50 px-3 py-1 font-mono text-xs text-amber-700"
                >
                  {difficulty}
                </span>
              ))}
            </div>
          </div>
          {isLoading ? (
            <span className="h-3 w-24 animate-pulse rounded bg-slate-200" />
          ) : (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
              {count} {count === 1 ? "MCQ" : "MCQs"}
            </p>
          )}
        </Link>
      ))}
    </section>
  );
}
