import { Roadmap } from "@/components/Roadmap";
import { getTopicSummaries } from "@/lib/problems";

export default function HomePage() {
  const topicSummaries = getTopicSummaries();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <section className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.45fr)] lg:items-end">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-teal-700">
            Rust learning roadmap
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Learn Rust by following the track.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Move through the topics in order, open a topic when you are ready,
            and mark progress as you go. Each stop has five coding questions and
            five MCQs labeled by difficulty.
          </p>
        </div>

        <aside className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-amber-950">
          <h2 className="text-xl font-bold">How to use this path</h2>
          <p className="mt-3 text-sm leading-6">
            Treat the homepage like your Rust map: start at Introduction, build
            momentum topic by topic, and use the progress toggles to remember
            where you left off.
          </p>
        </aside>
      </section>

      <Roadmap topics={topicSummaries} />
    </main>
  );
}
