import {
  getTopicBySlug,
  roadmapTopics,
  topics,
  type Difficulty,
  type Topic
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

export const defaultRustCode = `fn main() {
    println!("Hello, world!");
}`;

export { roadmapTopics, topics };

export function getTopicSummaries() {
  return roadmapTopics.map((topic) => ({
    ...topic,
    count: 0
  }));
}

export function getProblemTopicTitle(slug: string) {
  return getTopicBySlug(slug)?.title ?? slug;
}
