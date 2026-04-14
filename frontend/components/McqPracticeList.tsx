"use client";

import { useState } from "react";

import { McqCard } from "@/components/McqCard";
import type { Mcq } from "@/lib/mcqs";
import type { Difficulty } from "@/lib/topics";

type McqPracticeListProps = {
  mcqs: Mcq[];
};

type DifficultyFilter = "All" | Difficulty;

const difficultyFilters: DifficultyFilter[] = ["All", "Easy", "Medium", "Hard"];

export function McqPracticeList({ mcqs }: McqPracticeListProps) {
  const [activeFilter, setActiveFilter] = useState<DifficultyFilter>("All");

  const filteredMcqs =
    activeFilter === "All"
      ? mcqs
      : mcqs.filter((mcq) => mcq.difficulty === activeFilter);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">
            Showing {filteredMcqs.length}/{mcqs.length} MCQs
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Filter multiple-choice questions by difficulty.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {difficultyFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "bg-amber-600 text-white"
                  : "border border-slate-300 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {filteredMcqs.map((mcq, index) => (
          <McqCard key={mcq.id} mcq={mcq} index={index} />
        ))}
      </div>
    </section>
  );
}
