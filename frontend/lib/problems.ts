export type Problem = {
  id: string;
  title: string;
  description: string;
  topic: Topic;
  sampleInput: string;
  sampleOutput: string;
};

export type Topic =
  | "ownership"
  | "borrowing"
  | "mutability"
  | "structs"
  | "enums"
  | "error-handling"
  | "collections";

export const defaultRustCode = `fn main() {
    println!("Hello, world!");
}`;

export const problems: Problem[] = [
  {
    id: "move-a-string",
    title: "Move a String",
    description:
      "Create a String, move it into another variable, and print the moved value.",
    topic: "ownership",
    sampleInput: "rust",
    sampleOutput: "rust"
  },
  {
    id: "clone-a-name",
    title: "Clone a Name",
    description:
      "Read one word, clone it, and print both values on separate lines.",
    topic: "ownership",
    sampleInput: "Ferris",
    sampleOutput: "Ferris\nFerris"
  },
  {
    id: "borrow-to-count",
    title: "Borrow to Count",
    description:
      "Borrow a String in a helper function and print the number of characters without taking ownership.",
    topic: "borrowing",
    sampleInput: "borrow",
    sampleOutput: "6"
  },
  {
    id: "borrow-first-letter",
    title: "Borrow First Letter",
    description:
      "Read a word by reference and print its first character when one exists.",
    topic: "borrowing",
    sampleInput: "rust",
    sampleOutput: "r"
  },
  {
    id: "mutable-counter",
    title: "Mutable Counter",
    description:
      "Start a mutable counter at zero, add an input number to it, and print the result.",
    topic: "mutability",
    sampleInput: "5",
    sampleOutput: "5"
  },
  {
    id: "push-to-string",
    title: "Push to a String",
    description:
      "Read a word into a mutable String, append an exclamation mark, and print it.",
    topic: "mutability",
    sampleInput: "hello",
    sampleOutput: "hello!"
  },
  {
    id: "point-sum",
    title: "Point Sum",
    description:
      "Define a Point struct with x and y fields, read two numbers, and print their sum.",
    topic: "structs",
    sampleInput: "3 4",
    sampleOutput: "7"
  },
  {
    id: "person-label",
    title: "Person Label",
    description:
      "Create a Person struct with name and age fields, then print them in a simple label.",
    topic: "structs",
    sampleInput: "Ada 36",
    sampleOutput: "Ada is 36"
  },
  {
    id: "match-direction",
    title: "Match Direction",
    description:
      "Use an enum for directions and print the action for north, south, east, or west.",
    topic: "enums",
    sampleInput: "north",
    sampleOutput: "up"
  },
  {
    id: "traffic-light",
    title: "Traffic Light",
    description:
      "Represent a traffic light with an enum and print stop, wait, or go for the input color.",
    topic: "enums",
    sampleInput: "green",
    sampleOutput: "go"
  },
  {
    id: "parse-number",
    title: "Parse a Number",
    description:
      "Try to parse an integer from input and print either the number or invalid.",
    topic: "error-handling",
    sampleInput: "42",
    sampleOutput: "42"
  },
  {
    id: "safe-divide",
    title: "Safe Divide",
    description:
      "Read two integers and print their quotient, or print cannot divide when the divisor is zero.",
    topic: "error-handling",
    sampleInput: "8 2",
    sampleOutput: "4"
  },
  {
    id: "sum-vector",
    title: "Sum a Vector",
    description:
      "Read numbers into a vector and print the sum of every value.",
    topic: "collections",
    sampleInput: "4\n1 2 3 4",
    sampleOutput: "10"
  },
  {
    id: "unique-words",
    title: "Unique Words",
    description:
      "Read words, store them in a set, and print how many unique words were seen.",
    topic: "collections",
    sampleInput: "rust rust borrow",
    sampleOutput: "2"
  }
];

export function getProblemById(id: string) {
  return problems.find((problem) => problem.id === id);
}

export const topics: Topic[] = [
  "ownership",
  "borrowing",
  "mutability",
  "structs",
  "enums",
  "error-handling",
  "collections"
];

export function getProblemsByTopic(topic: string) {
  return problems.filter((problem) => problem.topic === topic);
}

export function getTopicSummaries() {
  return topics.map((topic) => ({
    topic,
    count: getProblemsByTopic(topic).length
  }));
}
