import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-65px)] overflow-hidden bg-slate-950 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:items-center">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-teal-300">
            BigRust
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
            Learn Rust through a focused practice roadmap!
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            BigRust helps you move from Rust basics to advanced topics with a
            guided track, coding problems, MCQs, difficulty labels, and progress
            tracking so you always know what to study next.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/topics"
              className="rounded-full bg-teal-300 px-7 py-4 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-200"
            >
              Get Started
            </Link>
            <p className="text-sm text-slate-400">
              24 topics. Coding practice. MCQ checks. One learning path.
            </p>
          </div>
        </div>

        <aside className="relative rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-teal-300/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative space-y-4">
            {[
              "Follow the ordered Rust roadmap",
              "Pick coding problems or MCQs per topic",
              "Filter by difficulty as you practice",
              "Track your progress locally"
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
              >
                <p className="font-mono text-xs text-teal-200">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-lg font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
