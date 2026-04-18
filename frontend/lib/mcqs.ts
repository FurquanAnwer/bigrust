import { roadmapTopics, type Difficulty, type Topic } from "@/lib/topics";

export type Mcq = {
  id: string;
  topic: Topic;
  topicTitle: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answer: string;
};

export function getMcqTopicSummaries() {
  return roadmapTopics.map((topic) => ({
    ...topic,
    count: 0
  }));
}
