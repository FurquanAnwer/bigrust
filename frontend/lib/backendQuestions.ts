import {
  getProblemById,
  getProblemsByTopic,
  type Problem
} from "@/lib/problems";
import { getMcqsByTopic, type Mcq } from "@/lib/mcqs";
import { getTopicBySlug } from "@/lib/topics";

const apiUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${apiUrl}${path}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function hydrateProblem(topic: string, problem: Omit<Problem, "topic" | "topicTitle">): Problem {
  const topicDetails = getTopicBySlug(topic);

  return {
    ...problem,
    topic: topic as Problem["topic"],
    topicTitle: topicDetails?.title ?? topic
  };
}

function hydrateMcq(topic: string, mcq: Omit<Mcq, "topic" | "topicTitle">): Mcq {
  const topicDetails = getTopicBySlug(topic);

  return {
    ...mcq,
    topic: topic as Mcq["topic"],
    topicTitle: topicDetails?.title ?? topic
  };
}

export async function getBackendProblemsByTopic(topic: string): Promise<Problem[]> {
  const data = await fetchJson<{ problems: Omit<Problem, "topic" | "topicTitle">[] }>(
    `/topics/${topic}/problems`
  );

  if (!data) {
    return getProblemsByTopic(topic);
  }

  return data.problems.map((problem) => hydrateProblem(topic, problem));
}

export async function getBackendMcqsByTopic(topic: string): Promise<Mcq[]> {
  const data = await fetchJson<{ mcqs: Omit<Mcq, "topic" | "topicTitle">[] }>(
    `/topics/${topic}/mcqs`
  );

  if (!data) {
    return getMcqsByTopic(topic);
  }

  return data.mcqs.map((mcq) => hydrateMcq(topic, mcq));
}

export async function getBackendProblemById(id: string): Promise<Problem | undefined> {
  const data = await fetchJson<{
    problem: Omit<Problem, "topic" | "topicTitle">;
    topic: string;
  }>(`/problems/${id}`);

  if (!data) {
    return getProblemById(id);
  }

  return hydrateProblem(data.topic, data.problem);
}
