export type Problem = {
  id: string;
  title: string;
  description: string;
  sampleInput: string;
  sampleOutput: string;
};

export const defaultRustCode = `fn main() {
    println!("Hello, world!");
}`;

export const problems: Problem[] = [
  {
    id: "sum-two-numbers",
    title: "Sum Two Numbers",
    description:
      "Read two integers and print their sum. This is a basic warm-up problem for handling input and output in Rust.",
    sampleInput: "2 5",
    sampleOutput: "7"
  },
  {
    id: "reverse-string",
    title: "Reverse a String",
    description:
      "Read a string and print the characters in reverse order. Focus on collecting chars safely before reversing them.",
    sampleInput: "rust",
    sampleOutput: "tsur"
  },
  {
    id: "max-of-array",
    title: "Max of Array",
    description:
      "Given a list of integers, print the maximum value. This is useful for practicing iteration and comparisons.",
    sampleInput: "5\n1 9 3 7 2",
    sampleOutput: "9"
  }
];

export function getProblemById(id: string) {
  return problems.find((problem) => problem.id === id);
}

