"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { MacbookScroll } from "@/components/ui/macbook-scroll";

const laptopScreen = `data:image/svg+xml,${encodeURIComponent(`
<svg width="960" height="720" viewBox="0 0 960 720" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="960" height="720" fill="#050505"/>
  <rect x="48" y="42" width="864" height="60" rx="8" fill="#141414"/>
  <circle cx="78" cy="72" r="7" fill="#ef4444"/>
  <circle cx="102" cy="72" r="7" fill="#f59e0b"/>
  <circle cx="126" cy="72" r="7" fill="#10b981"/>
  <rect x="168" y="62" width="244" height="20" rx="4" fill="#262626"/>
  <rect x="48" y="130" width="240" height="512" rx="8" fill="#0f0f0f"/>
  <rect x="318" y="130" width="594" height="512" rx="8" fill="#0b0b0b"/>
  <text x="78" y="180" fill="#5eead4" font-family="monospace" font-size="22" font-weight="700">BigRust</text>
  <text x="78" y="230" fill="#f5f5f5" font-family="monospace" font-size="18">01  ownership</text>
  <text x="78" y="270" fill="#a3a3a3" font-family="monospace" font-size="18">02  borrowing</text>
  <text x="78" y="310" fill="#a3a3a3" font-family="monospace" font-size="18">03  lifetimes</text>
  <text x="78" y="350" fill="#fbbf24" font-family="monospace" font-size="18">04  traits</text>
  <rect x="348" y="164" width="270" height="28" rx="4" fill="#134e4a"/>
  <text x="366" y="185" fill="#ccfbf1" font-family="monospace" font-size="16">coding problem</text>
  <text x="348" y="244" fill="#e5e5e5" font-family="monospace" font-size="22">fn main() {</text>
  <text x="382" y="292" fill="#5eead4" font-family="monospace" font-size="22">let name = "Ferris";</text>
  <text x="382" y="340" fill="#fbbf24" font-family="monospace" font-size="22">println!("Hello, {}", name);</text>
  <text x="348" y="388" fill="#e5e5e5" font-family="monospace" font-size="22">}</text>
  <rect x="348" y="454" width="498" height="56" rx="8" fill="#111827"/>
  <text x="372" y="489" fill="#86efac" font-family="monospace" font-size="18">✓ output matched</text>
  <rect x="348" y="542" width="156" height="46" rx="8" fill="#14b8a6"/>
  <text x="382" y="571" fill="#042f2e" font-family="Arial" font-size="18" font-weight="700">Run code</text>
</svg>
`)}`;

const practiceCards = [
  {
    label: "Read",
    title: "Start with one idea",
    copy: "Move through Rust in order, with each topic small enough to finish."
  },
  {
    label: "Solve",
    title: "Write real answers",
    copy: "Practice coding prompts and check your thinking with focused MCQs."
  },
  {
    label: "Return",
    title: "Keep the thread",
    copy: "Mark progress, revisit hard topics, and build momentum without guessing."
  }
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] text-neutral-50">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,#050505_0%,#0d0d0b_42%,#062d2b_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

      <section className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl gap-10 px-6 pb-8 pt-16 sm:px-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(420px,1fr)] lg:items-center lg:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-teal-200">
            BigRust
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Build Rust confidence one focused session at a time.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
            A steady path through ownership, borrowing, traits, lifetimes, and
            the parts that usually make Rust feel bigger than it is.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/topics"
              className="rounded-lg bg-teal-300 px-6 py-4 text-sm font-bold text-black transition hover:bg-teal-200"
            >
              Start the roadmap
            </Link>
            <Link
              href="/mcqs"
              className="rounded-lg border border-teal-200/35 bg-black/30 px-6 py-4 text-sm font-bold text-teal-100 transition hover:border-teal-100 hover:bg-teal-950/40"
            >
              Try MCQs
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {practiceCards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-white/10 bg-black/30 p-4 backdrop-blur"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-200">
                  {card.label}
                </p>
                <h2 className="mt-3 text-lg font-bold text-white">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  {card.copy}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto w-full max-w-2xl"
        >
          <div className="rounded-lg border border-teal-200/20 bg-black/45 p-3 shadow-[0_24px_90px_rgba(20,184,166,0.18)]">
            <div className="rounded-lg border border-white/10 bg-[#0a0a0a] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal-200">
                  today&apos;s session
                </p>
                <span className="rounded-md bg-amber-300 px-2 py-1 font-mono text-xs font-bold text-black">
                  24 topics
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Ownership warm-up
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-300">
                    Solve the prompt, run the Rust, then check the concept
                    before moving on.
                  </p>
                </div>
                <div className="rounded-lg border border-teal-300/20 bg-teal-300/10 px-4 py-3">
                  <p className="font-mono text-xs text-teal-100">progress</p>
                  <p className="mt-1 text-2xl font-bold text-white">07/24</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative -mt-16 border-t border-white/10 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,#050505_16%,#080806_100%)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 pt-16 sm:px-8 lg:grid-cols-[minmax(260px,0.45fr)_minmax(0,1fr)] lg:items-start">
          <div className="relative z-10 lg:sticky lg:top-24">
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-amber-200">
              practice loop
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
              The laptop opens into the work.
            </h2>
            <p className="mt-5 text-base leading-8 text-neutral-300">
              Keep the lesson, editor, and questions in one rhythm: read the
              idea, solve a prompt, then lock it in with quick checks.
            </p>
            <div className="mt-7 space-y-3">
              {["Backend-fed questions", "Rust code practice", "MCQs by topic"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-neutral-100"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="relative -mt-36 min-h-[120vh] overflow-hidden">
            <MacbookScroll
              title={
                <span>
                  Open a topic. Write the Rust. <br /> Check the answer.
                </span>
              }
              src={laptopScreen}
              showGradient={false}
              badge={
                <div className="rounded-lg bg-teal-300 px-3 py-2 text-xs font-bold text-black">
                  Live practice
                </div>
              }
            />
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 bg-[#050505]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-lg font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-200/25 bg-teal-300 font-mono text-sm text-black">
                BR
              </span>
              <span>BigRust</span>
            </Link>
            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-400">
              Practice Rust with a clear roadmap, backend-fed questions, coding
              prompts, and topic-wise checks that keep each session moving.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/topics"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:border-teal-200/50 hover:text-teal-100"
            >
              Roadmap
            </Link>
            <Link
              href="/mcqs"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:border-teal-200/50 hover:text-teal-100"
            >
              MCQs
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-5 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Built for steady Rust practice.</p>
            <p className="font-mono text-neutral-600">ownership / borrowing / traits / lifetimes</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
