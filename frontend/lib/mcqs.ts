import {
  roadmapTopics,
  type Difficulty,
  type Topic,
  topics
} from "@/lib/topics";
import interviewQuestions from "../../shared/interviewQuestions.json";

export type Mcq = {
  id: string;
  topic: Topic;
  topicTitle: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answer: string;
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

function buildMcqSet(topic: (typeof roadmapTopics)[number]): Mcq[] {
  const interviewMcqs =
    interviewQuestions.mcqs[topic.slug as keyof typeof interviewQuestions.mcqs];

  if (interviewMcqs) {
    return interviewMcqs.map((mcq) => ({
      ...mcq,
      topic: topic.slug,
      topicTitle: topic.title,
      difficulty: mcq.difficulty as Difficulty
    }));
  }

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
    },
    {
      question: `Which example size is best for starting ${topic.title}?`,
      options: [
        "A tiny focused program",
        "A whole operating system",
        "A random dependency tree",
        "A program with no output"
      ],
      answer: "A tiny focused program"
    },
    {
      question: `What should you check after changing code that uses ${topic.title}?`,
      options: [
        "That the program still compiles and behaves as expected",
        "That comments outnumber code",
        "That every variable is global",
        "That the code ignores warnings"
      ],
      answer: "That the program still compiles and behaves as expected"
    },
    {
      question: `What does a compiler error around ${topic.title} usually mean?`,
      options: [
        "The code violated a Rust rule that can be fixed",
        "Rust cannot run any program",
        "Cargo must be deleted",
        "The topic should be skipped forever"
      ],
      answer: "The code violated a Rust rule that can be fixed"
    },
    {
      question: `Which practice helps make ${topic.title} feel less mysterious?`,
      options: [
        "Change one thing at a time and rerun the code",
        "Paste larger examples without reading them",
        "Avoid examples with output",
        "Memorize syntax without typing"
      ],
      answer: "Change one thing at a time and rerun the code"
    },
    {
      question: `How should you name a helper used for ${topic.title}?`,
      options: [
        "Use a name that explains what the helper returns or changes",
        "Use a random single symbol every time",
        "Use the same name as a keyword",
        "Use an empty function name"
      ],
      answer: "Use a name that explains what the helper returns or changes"
    },
    {
      question: `Which signal shows you understand ${topic.title} better?`,
      options: [
        "You can explain why the code compiles",
        "You can hide all warnings",
        "You can avoid reading errors",
        "You can remove main"
      ],
      answer: "You can explain why the code compiles"
    },
    {
      question: `What is a useful next step after an easy ${topic.title} exercise?`,
      options: [
        "Add one edge case and solve it deliberately",
        "Delete the solution immediately",
        "Switch languages before testing",
        "Remove all input handling"
      ],
      answer: "Add one edge case and solve it deliberately"
    },
    {
      question: `Why do medium ${topic.title} tasks often include helper functions?`,
      options: [
        "They test whether you can structure logic clearly",
        "They make Rust dynamically typed",
        "They remove the need for compilation",
        "They disable ownership"
      ],
      answer: "They test whether you can structure logic clearly"
    },
    {
      question: `What is the safest way to handle uncertainty in a ${topic.title} solution?`,
      options: [
        "Represent the uncertain case explicitly",
        "Pretend invalid input never exists",
        "Panic on every input",
        "Use unrelated syntax"
      ],
      answer: "Represent the uncertain case explicitly"
    },
    {
      question: `Which review habit improves ${topic.title} code?`,
      options: [
        "Read the data flow from input to output",
        "Only count the number of lines",
        "Ignore function signatures",
        "Remove all tests"
      ],
      answer: "Read the data flow from input to output"
    },
    {
      question: `How can you make ${topic.title} code more idiomatic?`,
      options: [
        "Prefer clear Rust standard-library patterns",
        "Copy syntax from another language exactly",
        "Avoid type names completely",
        "Never use match or functions"
      ],
      answer: "Prefer clear Rust standard-library patterns"
    },
    {
      question: `What does a hard ${topic.title} task usually add?`,
      options: [
        "More constraints and interactions with other Rust concepts",
        "A guarantee that no compiler errors can happen",
        "A reason to skip examples",
        "A requirement to ignore ownership"
      ],
      answer: "More constraints and interactions with other Rust concepts"
    },
    {
      question: `How should you approach a hard ${topic.title} bug?`,
      options: [
        "Reduce it to a smaller failing case first",
        "Rewrite every file immediately",
        "Stop reading compiler output",
        "Add unrelated dependencies"
      ],
      answer: "Reduce it to a smaller failing case first"
    },
    {
      question: `What makes a ${topic.title} solution maintainable?`,
      options: [
        "Clear ownership of data and small readable steps",
        "Hidden side effects everywhere",
        "No separation of responsibilities",
        "Unused variables in every branch"
      ],
      answer: "Clear ownership of data and small readable steps"
    },
    {
      question: `Which final check is best before marking ${topic.title} solved?`,
      options: [
        "Run the code against normal and edge-case inputs",
        "Only check that the file opens",
        "Trust the first draft without compiling",
        "Delete the expected output"
      ],
      answer: "Run the code against normal and edge-case inputs"
    },
    {
      question: `What is the best first move when a ${topic.title} exercise feels too large?`,
      options: [
        "Split it into input, processing, and output steps",
        "Add unrelated macros",
        "Ignore the problem statement",
        "Delete every helper function"
      ],
      answer: "Split it into input, processing, and output steps"
    },
    {
      question: `Which test case should you add for ${topic.title}?`,
      options: [
        "A normal case and one edge case",
        "Only the example you already know",
        "No test cases until deployment",
        "A case from an unrelated language"
      ],
      answer: "A normal case and one edge case"
    },
    {
      question: `What should a good ${topic.title} solution avoid?`,
      options: [
        "Unclear data flow and unnecessary work",
        "Readable function names",
        "Checking compiler messages",
        "Small helper functions"
      ],
      answer: "Unclear data flow and unnecessary work"
    },
    {
      question: `How can you tell a ${topic.title} abstraction is useful?`,
      options: [
        "It makes the call site easier to understand",
        "It hides all errors forever",
        "It makes every value mutable",
        "It removes the need for main"
      ],
      answer: "It makes the call site easier to understand"
    },
    {
      question: `Why should examples for ${topic.title} include output?`,
      options: [
        "Output makes the expected behavior concrete",
        "Output disables borrow checking",
        "Output replaces types",
        "Output makes Cargo optional"
      ],
      answer: "Output makes the expected behavior concrete"
    },
    {
      question: `What is a useful habit when refactoring ${topic.title} code?`,
      options: [
        "Compile after each meaningful change",
        "Change every concept at once",
        "Remove all examples",
        "Rename everything randomly"
      ],
      answer: "Compile after each meaningful change"
    },
    {
      question: `What does a clean ${topic.title} implementation usually make obvious?`,
      options: [
        "Where data is created, transformed, and used",
        "How to skip compilation",
        "Why warnings should be ignored",
        "How to avoid function signatures"
      ],
      answer: "Where data is created, transformed, and used"
    },
    {
      question: `Which input should a medium ${topic.title} question often include?`,
      options: [
        "A value that forces a branch or fallback",
        "Only an empty file",
        "A package-lock file",
        "A compiler source archive"
      ],
      answer: "A value that forces a branch or fallback"
    },
    {
      question: `How should you handle repeated logic in ${topic.title} exercises?`,
      options: [
        "Move it into a helper with a clear signature",
        "Copy it into every branch forever",
        "Hide it in comments",
        "Make it depend on random input"
      ],
      answer: "Move it into a helper with a clear signature"
    },
    {
      question: `What makes a ${topic.title} answer easier to review?`,
      options: [
        "Small steps with descriptive names",
        "One huge expression with no structure",
        "Unused imports",
        "Missing expected output"
      ],
      answer: "Small steps with descriptive names"
    },
    {
      question: `Which Rust habit pairs well with ${topic.title}?`,
      options: [
        "Let the type system guide the design",
        "Fight every compiler message",
        "Avoid naming variables",
        "Use invalid syntax as a placeholder"
      ],
      answer: "Let the type system guide the design"
    },
    {
      question: `What should you do when a ${topic.title} solution passes only the happy path?`,
      options: [
        "Add cases for missing, invalid, or boundary input",
        "Mark it permanently complete",
        "Remove the example",
        "Delete the branch logic"
      ],
      answer: "Add cases for missing, invalid, or boundary input"
    },
    {
      question: `Why are hard ${topic.title} questions useful?`,
      options: [
        "They force you to combine the topic with other Rust ideas",
        "They remove the need for fundamentals",
        "They make easy questions irrelevant",
        "They guarantee shorter code"
      ],
      answer: "They force you to combine the topic with other Rust ideas"
    },
    {
      question: `What is the strongest sign that your ${topic.title} model is improving?`,
      options: [
        "You can predict compiler feedback before running it",
        "You never read the code again",
        "You avoid writing examples",
        "You replace every value with a string"
      ],
      answer: "You can predict compiler feedback before running it"
    },
    {
      question: `What makes a hard ${topic.title} prompt manageable?`,
      options: [
        "Solving one constraint at a time",
        "Solving every constraint in your head first",
        "Skipping the smallest example",
        "Ignoring the output format"
      ],
      answer: "Solving one constraint at a time"
    },
    {
      question: `Which code smell should you look for in ${topic.title} solutions?`,
      options: [
        "Branches that do the same work in slightly different ways",
        "A helper function with a clear name",
        "A checked edge case",
        "A readable match expression"
      ],
      answer: "Branches that do the same work in slightly different ways"
    },
    {
      question: `What is a good final polish step for ${topic.title}?`,
      options: [
        "Remove unnecessary code after the solution is correct",
        "Add unused variables",
        "Make all errors less clear",
        "Delete the sample output"
      ],
      answer: "Remove unnecessary code after the solution is correct"
    },
    {
      question: `How should you compare two ${topic.title} solutions?`,
      options: [
        "Prefer the one that is correct, readable, and idiomatic",
        "Prefer the one with more confusion",
        "Prefer the one that ignores errors",
        "Prefer the one that cannot compile"
      ],
      answer: "Prefer the one that is correct, readable, and idiomatic"
    },
    {
      question: `What should you record after solving a hard ${topic.title} question?`,
      options: [
        "The rule or pattern that unlocked the solution",
        "Only the number of minutes spent",
        "Nothing, because solved code is never reviewed",
        "A random unrelated syntax note"
      ],
      answer: "The rule or pattern that unlocked the solution"
    },
    {
      question: `What is the best reason to revisit ${topic.title} later?`,
      options: [
        "Spacing practice helps the concept stick",
        "Rust changes the answer every hour",
        "Old topics should be deleted",
        "Reviewing makes examples invalid"
      ],
      answer: "Spacing practice helps the concept stick"
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
