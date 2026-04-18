"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getBackendQuestionCounts,
  type TopicQuestionCount
} from "@/lib/backendQuestions";
import type { getTopicSummaries } from "@/lib/problems";

type RoadmapTopic = ReturnType<typeof getTopicSummaries>[number];

type RoadmapProps = {
  topics: RoadmapTopic[];
};

const storageKey = "bigrust-roadmap-progress";

export function Roadmap({ topics }: RoadmapProps) {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [questionCounts, setQuestionCounts] = useState<TopicQuestionCount[]>([]);
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);

  useEffect(() => {
    const savedProgress = window.localStorage.getItem(storageKey);
    if (savedProgress) {
      try {
        setCompletedTopics(JSON.parse(savedProgress) as string[]);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;

    async function loadQuestionCounts() {
      setIsLoadingCounts(true);

      try {
        const counts = await getBackendQuestionCounts();

        if (isCurrent) {
          setQuestionCounts(counts);
        }
      } catch {
        if (isCurrent) {
          setQuestionCounts([]);
        }
      } finally {
        if (isCurrent) {
          setIsLoadingCounts(false);
        }
      }
    }

    loadQuestionCounts();

    return () => {
      isCurrent = false;
    };
  }, []);

  function toggleTopic(slug: string) {
    setCompletedTopics((current) => {
      const next = current.includes(slug)
        ? current.filter((topic) => topic !== slug)
        : [...current, slug];

      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-card sm:p-6">
      <div className="mb-6 rounded-3xl bg-slate-950 p-5 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal-200">
              Your Rust track
            </p>
            <h2 className="mt-2 text-2xl font-bold">Follow the path, keep the streak.</h2>
          </div>
          <p className="text-sm text-slate-300">
            {completedCount}/{topics.length} topics marked complete
          </p>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-200 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <ol className="space-y-3">
        {topics.map((topic, index) => {
          const isComplete = completedTopics.includes(topic.slug);
          const counts = questionCounts.find((count) => count.topic === topic.slug);

          return (
            <li
              key={topic.slug}
              className="group grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white font-mono text-sm font-semibold text-slate-500 shadow-sm group-hover:text-teal-700">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <Link
                  href={`/topics/${topic.slug}`}
                  className="text-xl font-semibold text-slate-950 transition hover:text-teal-700"
                >
                  {topic.title}
                </Link>
                <p className="mt-1 text-sm leading-6 text-slate-600">{topic.summary}</p>
                {isLoadingCounts ? (
                  <div className="mt-3 h-3 w-52 animate-pulse rounded bg-slate-200" />
                ) : (
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                    {counts?.problemCount ?? 0} coding questions +{" "}
                    {counts?.mcqCount ?? 0} MCQs
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => toggleTopic(topic.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isComplete
                    ? "bg-teal-700 text-white hover:bg-teal-800"
                    : "border border-slate-300 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700"
                }`}
              >
                {isComplete ? "Completed" : "Mark done"}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
