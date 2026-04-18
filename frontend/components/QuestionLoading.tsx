type QuestionLoadingProps = {
  label: string;
  tone?: "teal" | "amber";
  cards?: number;
};

export function QuestionLoading({
  label,
  tone = "teal",
  cards = 4
}: QuestionLoadingProps) {
  const accentClass = tone === "amber" ? "border-amber-500" : "border-teal-600";
  const pulseClass = tone === "amber" ? "bg-amber-100" : "bg-teal-100";

  return (
    <section className="space-y-5" aria-live="polite" aria-busy="true">
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <span
          className={`h-9 w-9 animate-spin rounded-full border-4 border-slate-200 ${accentClass} border-t-transparent`}
        />
        <div>
          <p className="text-sm font-semibold text-slate-950">{label}</p>
          <p className="mt-1 text-sm text-slate-500">
            Pulling fresh interview questions from the backend.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {Array.from({ length: cards }, (_, index) => (
          <article
            key={index}
            className="animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-card"
          >
            <div className="mb-5 flex flex-wrap gap-3">
              <span className={`h-6 w-28 rounded-md ${pulseClass}`} />
              <span className="h-6 w-20 rounded-md bg-slate-100" />
              <span className="h-6 w-24 rounded-md bg-slate-100" />
            </div>
            <div className="h-6 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 space-y-3">
              <div className="h-4 rounded bg-slate-100" />
              <div className="h-4 w-5/6 rounded bg-slate-100" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
