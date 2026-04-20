import type { Problem, ProblemExample, ProblemTestCase } from "@/lib/problems";

const commonCaseBuilders: Record<
  string,
  (topicTitle: string) => ProblemTestCase[]
> = {
  "Concept Echo": (topicTitle) => [
    { input: "ownership", expectedOutput: `${topicTitle}: ownership` },
    { input: "borrowing", expectedOutput: `${topicTitle}: borrowing` },
    { input: "traits", expectedOutput: `${topicTitle}: traits` }
  ],
  "Keyword Counter": () => [
    { input: "rust borrow rust move rust", expectedOutput: "3" },
    { input: "rust rust rust", expectedOutput: "3" },
    { input: "borrow move clone", expectedOutput: "0" }
  ],
  "Yes No Normalizer": () => [
    { input: "YES", expectedOutput: "yes" },
    { input: " no ", expectedOutput: "no" },
    { input: "maybe", expectedOutput: "unknown" }
  ],
  "Labelled Pair": () => [
    { input: "safe fast", expectedOutput: "left=safe right=fast" },
    { input: "borrow move", expectedOutput: "left=borrow right=move" },
    { input: "left right", expectedOutput: "left=left right=right" }
  ],
  "Score Threshold": () => [
    { input: "72", expectedOutput: "pass" },
    { input: "70", expectedOutput: "pass" },
    { input: "69", expectedOutput: "review" }
  ],
  "Comma List Cleaner": () => [
    { input: " borrow, , move, clone ", expectedOutput: "borrow|move|clone" },
    { input: "one, two, , three", expectedOutput: "one|two|three" },
    { input: " rust ", expectedOutput: "rust" }
  ],
  "First And Last": () => [
    { input: "alpha beta gamma", expectedOutput: "alpha->gamma" },
    { input: "single", expectedOutput: "single->single" },
    { input: "", expectedOutput: "empty" }
  ],
  "Running Total": (topicTitle) => [
    { input: "4 8 15", expectedOutput: `${topicTitle} total=27` },
    { input: "1 -2 3", expectedOutput: `${topicTitle} total=2` },
    { input: "", expectedOutput: `${topicTitle} total=0` }
  ],
  "Even Filter": () => [
    { input: "1 2 3 4 5 6", expectedOutput: "2 4 6" },
    { input: "1 3 5", expectedOutput: "" },
    { input: "8 10 12", expectedOutput: "8 10 12" }
  ],
  "Longest Word": () => [
    { input: "rust ownership borrowing", expectedOutput: "ownership" },
    { input: "aa bbb cc", expectedOutput: "bbb" },
    { input: "tie one", expectedOutput: "tie" }
  ],
  "Indexed Lines": () => [
    { input: "alpha\nbeta\ngamma", expectedOutput: "1: alpha\n2: beta\n3: gamma" },
    { input: "one\n\ntwo", expectedOutput: "1: one\n2: two" },
    { input: "", expectedOutput: "" }
  ],
  "Reverse Tokens": () => [
    { input: "one two three", expectedOutput: "three two one" },
    { input: "rust", expectedOutput: "rust" },
    { input: "a b c d", expectedOutput: "d c b a" }
  ],
  "Duplicate Detector": () => [
    { input: "red blue red", expectedOutput: "duplicate" },
    { input: "red blue green", expectedOutput: "unique" },
    { input: "same same", expectedOutput: "duplicate" }
  ],
  "Range Formatter": () => [
    { input: "3 6", expectedOutput: "3,4,5,6" },
    { input: "1 1", expectedOutput: "1" },
    { input: "5 3", expectedOutput: "3,4,5" }
  ],
  "Frequency Report": () => [
    { input: "a b a c b a", expectedOutput: "a=3 b=2 c=1" },
    { input: "x y x", expectedOutput: "x=2 y=1" },
    { input: "one", expectedOutput: "one=1" }
  ],
  "Safe Division Table": () => [
    { input: "8 2 5 0 9 3", expectedOutput: "4 3" },
    { input: "10 2 12 4", expectedOutput: "5 3" },
    { input: "7 0", expectedOutput: "" }
  ],
  "Grouped Initials": () => [
    { input: "rust rules borrow build cargo", expectedOutput: "b c r" },
    { input: "apple ant banana", expectedOutput: "a b" },
    { input: "zebra yak xray", expectedOutput: "x y z" }
  ],
  "Window Sums": () => [
    { input: "1 2 3 4", expectedOutput: "3 5 7" },
    { input: "5 5", expectedOutput: "10" },
    { input: "9", expectedOutput: "" }
  ],
  "Command Interpreter": () => [
    { input: "add 5\nsub 2\nprint\nadd 10\nprint", expectedOutput: "3\n13" },
    { input: "add 1\nprint\nsub 4\nprint", expectedOutput: "1\n-3" },
    { input: "print", expectedOutput: "0" }
  ],
  "Mini Validator": () => [
    { input: "Ada:99\n:40\nLinus:101\nFerris:88", expectedOutput: "Ada:99\nFerris:88" },
    { input: "A:0\nB:100\nC:101", expectedOutput: "A:0\nB:100" },
    { input: ":50\nNoScore:", expectedOutput: "" }
  ]
};

const titleCaseBuilders: Record<string, ProblemTestCase[]> = {
  "Hello Candidate": [
    { input: "Ferris\n", expectedOutput: "Hello, Ferris. Welcome to Rust." },
    { input: " Ada ", expectedOutput: "Hello, Ada. Welcome to Rust." },
    { input: "Linus", expectedOutput: "Hello, Linus. Welcome to Rust." }
  ],
  "Cargo Command Classifier": [
    { input: "check", expectedOutput: "check code without producing a final executable" },
    { input: "run", expectedOutput: "compile and execute the project" },
    { input: "fmt", expectedOutput: "unknown" }
  ],
  "Compiler Message Summary": [
    { input: "warning", expectedOutput: "read the warning and decide whether the code should be improved" },
    { input: "success", expectedOutput: "move on to the next check" },
    { input: "blocked", expectedOutput: "unknown" }
  ],
  "Project File Router": [
    { input: "Cargo.toml", expectedOutput: "package metadata" },
    { input: "src/main.rs", expectedOutput: "binary source" },
    { input: "README.md", expectedOutput: "another file" }
  ],
  "Rust Promise Checker": [
    { input: "safety speed guessing", expectedOutput: "2" },
    { input: "safety speed concurrency", expectedOutput: "3" },
    { input: "guessing guessing guessing", expectedOutput: "0" }
  ],
  "Toolchain Interview Answer": [
    { input: "clippy", expectedOutput: "clippy suggests idiomatic improvements and catches common mistakes" },
    { input: "rustfmt", expectedOutput: "rustfmt formats Rust code consistently" },
    { input: "make", expectedOutput: "unknown" }
  ],
  "Build Step Planner": [
    { input: "compile execute build verify", expectedOutput: "build run test" },
    { input: "verify execute", expectedOutput: "test run" },
    { input: "ship", expectedOutput: "" }
  ],
  "Interview Checklist Formatter": [
    { input: "rustup, cargo, , rustfmt", expectedOutput: "1. rustup\n2. cargo\n3. rustfmt" },
    { input: " rustc , clippy ", expectedOutput: "1. rustc\n2. clippy" },
    { input: ", ,", expectedOutput: "" }
  ],
  "Error-First Explanation": [
    { input: "type", expectedOutput: "compare the expected type with the value being provided" },
    { input: "syntax", expectedOutput: "look near the reported token for a missing delimiter or keyword" },
    { input: "network", expectedOutput: "unknown" }
  ],
  "Cargo Output Parser": [
    { input: "Compiling app\nCompiling dep\nFinished dev\nRunning target/debug/app", expectedOutput: "compiling=2 finished=1 running=1" },
    { input: "Finished release\nRunning app", expectedOutput: "compiling=0 finished=1 running=1" },
    { input: "Checking app", expectedOutput: "compiling=0 finished=0 running=0" }
  ],
  "Immutable Binding Trace": [
    { input: "42", expectedOutput: "score=42" },
    { input: "0", expectedOutput: "score=0" },
    { input: "-7", expectedOutput: "score=-7" }
  ],
  "Make It Mutable": [
    { input: "10 5", expectedOutput: "15" },
    { input: "-2 8", expectedOutput: "6" },
    { input: "0 0", expectedOutput: "0" }
  ],
  "Shadow A String Length": [
    { input: "borrow", expectedOutput: "6" },
    { input: "rust", expectedOutput: "4" },
    { input: "", expectedOutput: "0" }
  ],
  "Constant Tax Rate": [
    { input: "200", expectedOutput: "36" },
    { input: "100", expectedOutput: "18" },
    { input: "0", expectedOutput: "0" }
  ],
  "Shadow To Change Type": [
    { input: " 21 ", expectedOutput: "42" },
    { input: "5", expectedOutput: "10" },
    { input: "-3", expectedOutput: "-6" }
  ],
  "Mutability Audit": [
    { input: "let x, let mut count, const LIMIT, let mut total", expectedOutput: "mutable=2 const=1" },
    { input: "const A, let mut b, let c", expectedOutput: "mutable=1 const=1" },
    { input: "let x, let y", expectedOutput: "mutable=0 const=0" }
  ],
  "Swap Without Mutating Inputs": [
    { input: "left right", expectedOutput: "right left" },
    { input: "first second", expectedOutput: "second first" },
    { input: "a b", expectedOutput: "b a" }
  ],
  "Scope Boundary Reporter": [
    { input: "outer inner", expectedOutput: "inside=inner\noutside=outer" },
    { input: "global local", expectedOutput: "inside=local\noutside=global" },
    { input: "x y", expectedOutput: "inside=y\noutside=x" }
  ],
  "Shadowing Pipeline": [
    { input: "  Rust Makes Safety Practical  ", expectedOutput: "4" },
    { input: "one two", expectedOutput: "2" },
    { input: " spaced   words here ", expectedOutput: "3" }
  ],
  "Immutable By Default Fix": [
    { input: "start=10 add=5 add=7", expectedOutput: "start=10 total=22" },
    { input: "start=0 add=1 add=2", expectedOutput: "start=0 total=3" },
    { input: "start=5", expectedOutput: "start=5 total=5" }
  ],
  "Type Annotation Gate": [
    { input: "age:i32 name:String index:usize active:bool", expectedOutput: "2" },
    { input: "a:i32 b:u64 c:String", expectedOutput: "2" },
    { input: "name:String active:bool", expectedOutput: "0" }
  ],
  "Binding Lifetime Story": [
    { input: "outer:x inner:x outer:y inner:z", expectedOutput: "shadowed=1" },
    { input: "outer:a inner:a outer:b inner:b", expectedOutput: "shadowed=2" },
    { input: "outer:a inner:b", expectedOutput: "shadowed=0" }
  ],
  "Write An Add Function": [
    { input: "8 13", expectedOutput: "21" },
    { input: "-2 5", expectedOutput: "3" },
    { input: "0 0", expectedOutput: "0" }
  ],
  "Expression Return": [
    { input: "7", expectedOutput: "49" },
    { input: "3", expectedOutput: "9" },
    { input: "-4", expectedOutput: "16" }
  ],
  "Boolean Helper": [
    { input: "12", expectedOutput: "even" },
    { input: "7", expectedOutput: "odd" },
    { input: "0", expectedOutput: "even" }
  ],
  "Unit Return Logger": [
    { input: "ready", expectedOutput: "status=ready" },
    { input: "done", expectedOutput: "status=done" },
    { input: " waiting ", expectedOutput: "status=waiting" }
  ],
  "Parse Then Compute": [
    { input: "14", expectedOutput: "42" },
    { input: "0", expectedOutput: "0" },
    { input: "-3", expectedOutput: "-9" }
  ],
  "Borrowed String Formatter": [
    { input: "Ferris 99", expectedOutput: "Ferris scored 99" },
    { input: "Ada 100", expectedOutput: "Ada scored 100" },
    { input: "Linus 0", expectedOutput: "Linus scored 0" }
  ],
  "Tuple Return": [
    { input: "30 12", expectedOutput: "min=12 max=30" },
    { input: "5 5", expectedOutput: "min=5 max=5" },
    { input: "-1 4", expectedOutput: "min=-1 max=4" }
  ],
  "Early Return Guard": [
    { input: "10 0", expectedOutput: "division by zero" },
    { input: "10 2", expectedOutput: "5" },
    { input: "9 3", expectedOutput: "3" }
  ],
  "Function Composition Pipeline": [
    { input: "  RUST interviews reward clarity  ", expectedOutput: "4" },
    { input: "one two", expectedOutput: "2" },
    { input: " spaced   words here ", expectedOutput: "3" }
  ],
  "Return Result From Validator": [
    { input: "70000", expectedOutput: "err:port out of range" },
    { input: "8080", expectedOutput: "ok:8080" },
    { input: "0", expectedOutput: "err:port out of range" }
  ],
  "Higher Order Calculator": [
    { input: "multiply 6 7", expectedOutput: "42" },
    { input: "add 6 7", expectedOutput: "13" },
    { input: "subtract 6 7", expectedOutput: "-1" }
  ],
  "Small API Design": [
    { input: "400 600 200", expectedOutput: "1080" },
    { input: "100 100 0", expectedOutput: "180" },
    { input: "0 0 0", expectedOutput: "0" }
  ]
};

const staticOutputTitles = new Set([
  "Explain Rust From Program Output",
  "Main Function Shape"
]);

function getCommonSuffix(title: string) {
  return Object.keys(commonCaseBuilders).find((suffix) => title.endsWith(suffix));
}

function getGeneratedCases(problem: Problem): ProblemTestCase[] {
  if (problem.testCases?.length) {
    return problem.testCases;
  }

  if (titleCaseBuilders[problem.title]) {
    return titleCaseBuilders[problem.title];
  }

  if (staticOutputTitles.has(problem.title)) {
    return [
      {
        input: problem.sampleInput,
        expectedOutput: problem.sampleOutput
      }
    ];
  }

  const suffix = getCommonSuffix(problem.title);
  if (suffix) {
    return commonCaseBuilders[suffix](problem.topicTitle);
  }

  return [
    {
      input: problem.sampleInput,
      expectedOutput: problem.sampleOutput
    }
  ];
}

export function getProblemTestCases(problem: Problem): ProblemTestCase[] {
  return getGeneratedCases(problem);
}

export function getProblemExamples(problem: Problem): ProblemExample[] {
  if (problem.examples?.length) {
    return problem.examples.slice(0, 3);
  }

  return getGeneratedCases(problem)
    .slice(0, 3)
    .map((testCase) => ({
      input: testCase.input,
      output: testCase.expectedOutput
    }));
}
