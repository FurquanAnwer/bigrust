import {
  roadmapTopics,
  type Difficulty,
  type Topic,
  topics
} from "@/lib/topics";

export type Mcq = {
  id: string;
  topic: Topic;
  topicTitle: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answer: string;
};

const difficultyPattern: Difficulty[] = ["Easy", "Easy", "Medium", "Medium", "Hard"];

function buildMcqSet(topic: (typeof roadmapTopics)[number]): Mcq[] {
  const questions = [
    {
      question: `What should you focus on first when learning ${topic.title}?`,
      options: [
        `The core rules of ${topic.concept}`,
        "Skipping the compiler feedback",
        "Writing unsafe code immediately",
        "Avoiding small examples"
      ],
      answer: `The core rules of ${topic.concept}`
    },
    {
      question: `Which habit helps most when practicing ${topic.title}?`,
      options: [
        "Run tiny examples and read the compiler messages",
        "Memorize errors without compiling",
        "Use every advanced feature at once",
        "Ignore ownership and types"
      ],
      answer: "Run tiny examples and read the compiler messages"
    },
    {
      question: `Why is ${topic.title} important in Rust?`,
      options: [
        `It helps you write safer code around ${topic.concept}`,
        "It turns Rust into JavaScript",
        "It disables type checking",
        "It replaces Cargo"
      ],
      answer: `It helps you write safer code around ${topic.concept}`
    },
    {
      question: `What is a good way to debug a ${topic.title} mistake?`,
      options: [
        "Reduce the code to the smallest failing example",
        "Add random syntax until it compiles",
        "Delete all type annotations forever",
        "Assume the compiler is guessing"
      ],
      answer: "Reduce the code to the smallest failing example"
    },
    {
      question: `When should you move from ${topic.title} to the next roadmap topic?`,
      options: [
        "After solving a few easy and medium exercises without guessing",
        "Before writing any code",
        "Only after memorizing the Rust source code",
        "When every program uses macros"
      ],
      answer: "After solving a few easy and medium exercises without guessing"
    }
  ];

  return questions.map((question, index) => ({
    ...question,
    id: `${topic.slug}-mcq-${index + 1}`,
    topic: topic.slug,
    topicTitle: topic.title,
    difficulty: difficultyPattern[index]
  }));
}

export const mcqs: Mcq[] = roadmapTopics.flatMap(buildMcqSet);

export { topics };

export function getMcqsByTopic(topic: string) {
  return mcqs.filter((mcq) => mcq.topic === topic);
}

export function getMcqTopicSummaries() {
  return roadmapTopics.map((topic) => ({
    ...topic,
    count: getMcqsByTopic(topic.slug).length
  }));
}
