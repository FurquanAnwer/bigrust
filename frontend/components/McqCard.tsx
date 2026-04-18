import type { Mcq } from "@/lib/mcqs";

type McqCardProps = {
  mcq: Mcq;
  index: number;
};

function splitQuestion(question: string) {
  const [prompt, ...snippetParts] = question.split(/\n\s*\n/);
  const snippet = snippetParts.join("\n\n").trim();

  return {
    prompt,
    snippet: snippet.length > 0 ? snippet : null
  };
}

function looksLikeCode(value: string) {
  return (
    value.includes("\n") ||
    /(^|\s)(fn|let|const|use|struct|enum|impl|match|macro_rules!)\b/.test(value) ||
    value.includes("println!") ||
    value.includes("::") ||
    value.endsWith(";")
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-100">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

function FormattedText({ value }: { value: string }) {
  if (looksLikeCode(value)) {
    return (
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-6">
        <code>{value}</code>
      </pre>
    );
  }

  return <span className="whitespace-pre-wrap">{value}</span>;
}

export function McqCard({ mcq, index }: McqCardProps) {
  const { prompt, snippet } = splitQuestion(mcq.question);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-teal-50 px-3 py-1 font-mono text-xs text-teal-700">
          {mcq.topicTitle}
        </span>
        <span className="rounded-md bg-amber-50 px-3 py-1 font-mono text-xs text-amber-700">
          {mcq.difficulty}
        </span>
        <span className="text-sm text-slate-500">Question {index + 1}</span>
      </div>

      <h2 className="whitespace-pre-wrap text-lg font-semibold leading-7 text-slate-950">
        {prompt}
      </h2>

      {snippet ? <CodeBlock>{snippet}</CodeBlock> : null}

      <ul className="mt-4 space-y-2">
        {mcq.options.map((option) => (
          <li
            key={option}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            <FormattedText value={option} />
          </li>
        ))}
      </ul>

      <details className="mt-4 rounded-lg border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-900">
        <summary className="cursor-pointer font-semibold">Show answer</summary>
        <div className="mt-2">
          <FormattedText value={mcq.answer} />
        </div>
      </details>
    </article>
  );
}
