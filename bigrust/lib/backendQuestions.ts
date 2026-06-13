import type { Mcq } from "@/lib/mcqs";
import type { Problem } from "@/lib/problems";
import { getTopicBySlug, roadmapTopics } from "@/lib/topics";

const apiUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000";

type BackendProblem = Omit<Problem, "topic" | "topicTitle">;
type BackendMcq = Omit<Mcq, "topic" | "topicTitle">;

export type TopicQuestionSummary = (typeof roadmapTopics)[number] & {
  count: number;
};

export type TopicQuestionCount = {
  topic: string;
  problemCount: number;
  mcqCount: number;
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`);

  if (!response.ok) {
    let errorMessage = "Unable to load questions from the backend.";

    try {
      const data = (await response.json()) as { error?: string };
      errorMessage = data.error ?? errorMessage;
    } catch {
      // Keep the generic message when the backend sends a non-JSON error.
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}

function hydrateProblem(topic: string, problem: BackendProblem): Problem {
  const topicDetails = getTopicBySlug(topic);

  return {
    ...problem,
    topic: topic as Problem["topic"],
    topicTitle: topicDetails?.title ?? topic
  };
}

function hydrateMcq(topic: string, mcq: BackendMcq): Mcq {
  const topicDetails = getTopicBySlug(topic);

  return {
    ...mcq,
    topic: topic as Mcq["topic"],
    topicTitle: topicDetails?.title ?? topic
  };
}

export async function getBackendProblemsByTopic(topic: string): Promise<Problem[]> {
  const data = await fetchJson<{ problems: BackendProblem[] }>(
    `/topics/${encodeURIComponent(topic)}/problems`
  );

  return data.problems.map((problem) => hydrateProblem(topic, problem));
}

export async function getBackendMcqsByTopic(topic: string): Promise<Mcq[]> {
  const data = await fetchJson<{ mcqs: BackendMcq[] }>(
    `/topics/${encodeURIComponent(topic)}/mcqs`
  );

  return data.mcqs.map((mcq) => hydrateMcq(topic, mcq));
}

export async function getBackendProblemById(id: string): Promise<Problem> {
  const data = await fetchJson<{
    problem: BackendProblem;
    topic: string;
  }>(`/problems/${encodeURIComponent(id)}`);

  return hydrateProblem(data.topic, data.problem);
}

export async function getBackendProblemTopicSummaries(): Promise<TopicQuestionSummary[]> {
  const counts = await getBackendQuestionCounts();

  return roadmapTopics.map((topic) => ({
    ...topic,
    count:
      counts.find((count) => count.topic === topic.slug)?.problemCount ?? 0
  }));
}

export async function getBackendMcqTopicSummaries(): Promise<TopicQuestionSummary[]> {
  const counts = await getBackendQuestionCounts();

  return roadmapTopics.map((topic) => ({
    ...topic,
    count: counts.find((count) => count.topic === topic.slug)?.mcqCount ?? 0
  }));
}

export async function getBackendQuestionCounts(): Promise<TopicQuestionCount[]> {
  const data = await fetchJson<{ counts: TopicQuestionCount[] }>(
    "/topics/question-counts"
  );

  return data.counts;
}
