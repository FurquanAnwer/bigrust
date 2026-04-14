import {
  getTopicBySlug,
  roadmapTopics,
  type Difficulty,
  type Topic,
  topics
} from "@/lib/topics";

export type Problem = {
  id: string;
  title: string;
  description: string;
  topic: Topic;
  topicTitle: string;
  difficulty: Difficulty;
  sampleInput: string;
  sampleOutput: string;
};

const difficultyPattern: Difficulty[] = Array.from(
  { length: 40 },
  (_, index): Difficulty => {
    if (index < 14) {
      return "Easy";
    }

    if (index < 28) {
      return "Medium";
    }

    return "Hard";
  }
);

export const defaultRustCode = `fn main() {
    println!("Hello, world!");
}`;

function buildProblemSet(topic: (typeof roadmapTopics)[number]): Problem[] {
  const prompts = [
    {
      title: `${topic.title} Warm-up`,
      description: `Write a short Rust program that demonstrates the core idea of ${topic.concept}. Keep it small, readable, and print the final value.`,
      sampleInput: "4",
      sampleOutput: `${topic.title}: 4`
    },
    {
      title: `Trace ${topic.title}`,
      description: `Read two values and show how ${topic.concept} changes the result. Print one clear line explaining the outcome.`,
      sampleInput: "3 7",
      sampleOutput: `${topic.title}: 10`
    },
    {
      title: `${topic.title} Refactor`,
      description: `Move the ${topic.concept} logic into a helper function and call it from main. Return the computed value instead of printing inside the helper.`,
      sampleInput: "rust",
      sampleOutput: `${topic.title}: rust`
    },
    {
      title: `${topic.title} Edge Case`,
      description: `Handle an empty or missing input case while practicing ${topic.concept}. Print "empty" when there is no useful value.`,
      sampleInput: "",
      sampleOutput: "empty"
    },
    {
      title: `${topic.title} Challenge`,
      description: `Combine ${topic.concept} with input parsing, branching, and a small reusable abstraction. Print the final result in a predictable format.`,
      sampleInput: "5 2",
      sampleOutput: `${topic.title}: 7`
    },
    {
      title: `${topic.title} Name Tag`,
      description: `Read a name and use ${topic.concept} to format a short label. Print the final label exactly once.`,
      sampleInput: "Ferris",
      sampleOutput: `${topic.title}: Ferris`
    },
    {
      title: `${topic.title} Counter`,
      description: `Read three numbers, process them while practicing ${topic.concept}, and print the total count or sum.`,
      sampleInput: "1 2 3",
      sampleOutput: `${topic.title}: 6`
    },
    {
      title: `${topic.title} Validator`,
      description: `Read one value, validate it using ${topic.concept}, and print "valid" or "invalid" based on the rule you choose.`,
      sampleInput: "rust",
      sampleOutput: "valid"
    },
    {
      title: `${topic.title} Formatter`,
      description: `Transform an input value using ${topic.concept} and print it with a clear prefix so the output is easy to check.`,
      sampleInput: "learn",
      sampleOutput: `${topic.title}: learn`
    },
    {
      title: `${topic.title} Pair Builder`,
      description: `Read two words and combine them through a small ${topic.concept} example. Print both words in order.`,
      sampleInput: "rust ownership",
      sampleOutput: "rust ownership"
    },
    {
      title: `${topic.title} Boolean Check`,
      description: `Use ${topic.concept} to compute a boolean result from input and print true or false.`,
      sampleInput: "8",
      sampleOutput: "true"
    },
    {
      title: `${topic.title} Reusable Helper`,
      description: `Write two helper functions that each demonstrate ${topic.concept}, then call them from main and print one combined result.`,
      sampleInput: "4 6",
      sampleOutput: `${topic.title}: 10`
    },
    {
      title: `${topic.title} Data Cleanup`,
      description: `Read a line of text, clean it up with ${topic.concept}, and print the normalized value.`,
      sampleInput: "  rust  ",
      sampleOutput: `${topic.title}: rust`
    },
    {
      title: `${topic.title} Scoreboard`,
      description: `Read a list of scores and apply ${topic.concept} to produce a final scoreboard total.`,
      sampleInput: "10 20 30",
      sampleOutput: `${topic.title}: 60`
    },
    {
      title: `${topic.title} Split Decision`,
      description: `Use ${topic.concept} with conditional logic to choose between two output messages.`,
      sampleInput: "12",
      sampleOutput: "accepted"
    },
    {
      title: `${topic.title} Mini Parser`,
      description: `Parse structured input, use ${topic.concept} in the processing step, and print a compact result.`,
      sampleInput: "id=7",
      sampleOutput: `${topic.title}: 7`
    },
    {
      title: `${topic.title} Collection Pass`,
      description: `Process multiple input values and apply ${topic.concept} to each value before printing the final summary.`,
      sampleInput: "a b c",
      sampleOutput: `${topic.title}: 3`
    },
    {
      title: `${topic.title} State Machine`,
      description: `Model a tiny two-state workflow using ${topic.concept}. Print the final state after reading the input.`,
      sampleInput: "start",
      sampleOutput: "done"
    },
    {
      title: `${topic.title} Error Path`,
      description: `Handle both a normal path and a failure path while practicing ${topic.concept}. Print a helpful message for each.`,
      sampleInput: "0",
      sampleOutput: "handled"
    },
    {
      title: `${topic.title} Ownership Mix`,
      description: `Combine ${topic.concept} with ownership-aware function calls. Avoid unnecessary cloning and print the final value.`,
      sampleInput: "big rust",
      sampleOutput: `${topic.title}: big rust`
    },
    {
      title: `${topic.title} Performance Pass`,
      description: `Solve the task with a single pass over the input while keeping the ${topic.concept} code readable.`,
      sampleInput: "2 4 6 8",
      sampleOutput: `${topic.title}: 20`
    },
    {
      title: `${topic.title} Final Boss`,
      description: `Build a small complete program that combines ${topic.concept}, parsing, validation, and formatted output.`,
      sampleInput: "Ferris 21",
      sampleOutput: `${topic.title}: Ferris 21`
    },
    {
      title: `${topic.title} Input Router`,
      description: `Read a command word and route it through a ${topic.concept} example. Print the chosen route.`,
      sampleInput: "run",
      sampleOutput: "route: run"
    },
    {
      title: `${topic.title} Range Summary`,
      description: `Read a start and end value, apply ${topic.concept}, and print a short summary of the range.`,
      sampleInput: "2 5",
      sampleOutput: `${topic.title}: 2..5`
    },
    {
      title: `${topic.title} Duplicate Finder`,
      description: `Read a few values and use ${topic.concept} to detect whether any value appears more than once.`,
      sampleInput: "rust rust cargo",
      sampleOutput: "duplicate"
    },
    {
      title: `${topic.title} Token Counter`,
      description: `Split an input line into tokens and practice ${topic.concept} while counting the useful tokens.`,
      sampleInput: "cargo run test",
      sampleOutput: `${topic.title}: 3`
    },
    {
      title: `${topic.title} Threshold Gate`,
      description: `Read a number and use ${topic.concept} to decide whether it passes a threshold.`,
      sampleInput: "64",
      sampleOutput: "pass"
    },
    {
      title: `${topic.title} Reverse Report`,
      description: `Read a small sequence and apply ${topic.concept} before printing the sequence in reverse order.`,
      sampleInput: "a b c",
      sampleOutput: "c b a"
    },
    {
      title: `${topic.title} Optional Label`,
      description: `Handle input that may be present or missing, then use ${topic.concept} to print either the value or a fallback.`,
      sampleInput: "Ferris",
      sampleOutput: "label: Ferris"
    },
    {
      title: `${topic.title} Running Total`,
      description: `Read several integers and keep a running total while keeping the ${topic.concept} code clear.`,
      sampleInput: "4 5 6",
      sampleOutput: `${topic.title}: 15`
    },
    {
      title: `${topic.title} Normalized Pair`,
      description: `Read two strings, normalize them through ${topic.concept}, and print the normalized pair.`,
      sampleInput: "Rust Cargo",
      sampleOutput: "rust cargo"
    },
    {
      title: `${topic.title} Match Report`,
      description: `Compare two values, use ${topic.concept} in the comparison path, and print whether they match.`,
      sampleInput: "rust rust",
      sampleOutput: "match"
    },
    {
      title: `${topic.title} Batch Processor`,
      description: `Process a batch of inputs with ${topic.concept} and print a count of successfully processed items.`,
      sampleInput: "ok ok bad ok",
      sampleOutput: `${topic.title}: 3`
    },
    {
      title: `${topic.title} Config Reader`,
      description: `Read a key-value style input and use ${topic.concept} to extract the useful value.`,
      sampleInput: "mode=debug",
      sampleOutput: "debug"
    },
    {
      title: `${topic.title} Boundary Check`,
      description: `Check lower and upper bounds while practicing ${topic.concept}. Print "inside" or "outside".`,
      sampleInput: "5",
      sampleOutput: "inside"
    },
    {
      title: `${topic.title} Transform Pipeline`,
      description: `Build a small two-step transform pipeline using ${topic.concept} and print the final transformed value.`,
      sampleInput: "rust",
      sampleOutput: `${topic.title}: RUST`
    },
    {
      title: `${topic.title} Retry Flow`,
      description: `Model a small retry flow with ${topic.concept}, then print whether the second attempt succeeds.`,
      sampleInput: "fail pass",
      sampleOutput: "pass"
    },
    {
      title: `${topic.title} Compact Encoder`,
      description: `Read a few fields, encode them into one compact output string, and keep the ${topic.concept} code easy to follow.`,
      sampleInput: "rs 2026",
      sampleOutput: "rs-2026"
    },
    {
      title: `${topic.title} Nested Decision`,
      description: `Combine ${topic.concept} with a nested decision and print the exact branch that was selected.`,
      sampleInput: "admin active",
      sampleOutput: "admin-active"
    },
    {
      title: `${topic.title} Final Review`,
      description: `Write a complete solution that reviews ${topic.concept} with input parsing, a helper function, and formatted output.`,
      sampleInput: "review 9",
      sampleOutput: `${topic.title}: review 9`
    }
  ];

  return prompts.map((prompt, index) => ({
    id: `${topic.slug}-${index + 1}`,
    topic: topic.slug,
    topicTitle: topic.title,
    difficulty: difficultyPattern[index],
    ...prompt
  }));
}

export const problems: Problem[] = roadmapTopics.flatMap(buildProblemSet);

export function getProblemById(id: string) {
  return problems.find((problem) => problem.id === id);
}

export { roadmapTopics, topics };

export function getProblemsByTopic(topic: string) {
  return problems.filter((problem) => problem.topic === topic);
}

export function getTopicSummaries() {
  return roadmapTopics.map((topic) => ({
    ...topic,
    count: getProblemsByTopic(topic.slug).length
  }));
}

export function getProblemTopicTitle(slug: string) {
  return getTopicBySlug(slug)?.title ?? slug;
}
