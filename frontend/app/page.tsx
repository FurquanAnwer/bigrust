"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-65px)] overflow-hidden bg-slate-950 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-amber-500/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        {/* Floating dots */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-teal-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <section className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="font-mono text-sm uppercase tracking-[0.3em] text-teal-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            BigRust
          </motion.p>
          <motion.h1
            className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Learn Rust through a focused practice roadmap!
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            BigRust helps you move from Rust basics to advanced topics with a
            guided track, coding problems, MCQs, difficulty labels, and progress
            tracking so you always know what to study next.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/topics"
                className="rounded-full bg-teal-300 px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-teal-200"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.p
              className="text-sm text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              24 topics. Coding practice. MCQ checks. One learning path.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.aside
          className="relative rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-teal-300/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative space-y-4">
            {[
              "Follow the ordered Rust roadmap",
              "Pick coding problems or MCQs per topic",
              "Filter by difficulty as you practice",
              "Track your progress locally"
            ].map((item, index) => (
              <motion.div
                key={item}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7 + index * 0.1,
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                }}
              >
                <motion.p
                  className="font-mono text-xs text-teal-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                >
                  Step {String(index + 1).padStart(2, "0")}
                </motion.p>
                <motion.p
                  className="mt-2 text-lg font-semibold"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                >
                  {item}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </section>

      {/* MacBook Scroll Section */}
      <MacbookScroll
        title={
          <span>
            Master Rust Programming <br /> with Interactive Learning
          </span>
        }
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiMxNzE3MTciIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMmQzZDM3IiBvZmZzZXQ9IjUwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMxNzE3MTciIG9mZnNldD0iMTAwJSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSI1MCUiIHk9IjQwJSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+PGNvZGU+Zm4gbWFpbigpIHt9PC9jb2RlPjwvdGV4dD48L3N2Zz4="
        showGradient={true}
        badge={
          <div className="rounded-full bg-teal-500 px-3 py-1 text-xs text-white">
            🚀 Live Coding Environment
          </div>
        }
      />
    </main>
  );
}
