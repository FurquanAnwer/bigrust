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

const difficultyPattern: Difficulty[] = ["Easy", "Easy", "Medium", "Medium", "Hard"];

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
