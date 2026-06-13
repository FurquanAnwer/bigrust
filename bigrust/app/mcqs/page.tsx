import { McqTopicList } from "@/components/McqTopicList";

export default function McqsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <section className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          MCQs
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Review Rust concepts with topic-wise multiple choice questions.
        </p>
      </section>

      <McqTopicList />
    </main>
  );
}
