export const roadmapTopics = [
  {
    slug: "rust-introduction",
    title: "Rust Introduction",
    summary: "Start with Rust's purpose, tooling, and the shape of a small program.",
    concept: "Rust basics"
  },
  {
    slug: "variables",
    title: "Variables",
    summary: "Practice bindings, shadowing, constants, and mutability.",
    concept: "variables and bindings"
  },
  {
    slug: "functions",
    title: "Functions",
    summary: "Break work into reusable Rust functions with parameters and return values.",
    concept: "function design"
  },
  {
    slug: "if",
    title: "If",
    summary: "Use conditional expressions to make decisions in Rust programs.",
    concept: "conditional logic"
  },
  {
    slug: "primitive-types",
    title: "primitive types",
    summary: "Work with integers, floats, booleans, characters, tuples, and arrays.",
    concept: "primitive types"
  },
  {
    slug: "vecs",
    title: "Vecs",
    summary: "Store, update, and inspect growable lists with Vec.",
    concept: "vectors"
  },
  {
    slug: "move-semantics",
    title: "move semantics",
    summary: "Understand how ownership moves between bindings and function calls.",
    concept: "move semantics"
  },
  {
    slug: "structs",
    title: "structs",
    summary: "Model related data with named fields and impl blocks.",
    concept: "structs"
  },
  {
    slug: "enums",
    title: "Enums",
    summary: "Represent choices and variants with Rust enums.",
    concept: "enums"
  },
  {
    slug: "strings",
    title: "Strings",
    summary: "Practice String, &str, ownership, and text manipulation.",
    concept: "strings"
  },
  {
    slug: "modules",
    title: "Modules",
    summary: "Organize code with modules, visibility, and paths.",
    concept: "modules"
  },
  {
    slug: "hashmaps",
    title: "Hashmaps",
    summary: "Store key-value data with HashMap and the entry API.",
    concept: "hash maps"
  },
  {
    slug: "options",
    title: "Options",
    summary: "Handle values that may or may not exist with Option.",
    concept: "Option"
  },
  {
    slug: "error-handling",
    title: "Error handling",
    summary: "Use Result, match, and the question-mark operator for recoverable errors.",
    concept: "error handling"
  },
  {
    slug: "generics",
    title: "Generics",
    summary: "Write reusable code that works across multiple types.",
    concept: "generics"
  },
  {
    slug: "traits",
    title: "Traits",
    summary: "Describe shared behavior and use trait bounds.",
    concept: "traits"
  },
  {
    slug: "lifetimes",
    title: "Lifetimes",
    summary: "Reason about borrowed data and reference validity.",
    concept: "lifetimes"
  },
  {
    slug: "tests",
    title: "Tests",
    summary: "Write unit tests and verify behavior with assertions.",
    concept: "testing"
  },
  {
    slug: "iterators",
    title: "Iterators",
    summary: "Transform collections with iterator adapters and consumers.",
    concept: "iterators"
  },
  {
    slug: "smart-pointers",
    title: "Smart pointers",
    summary: "Explore Box, Rc, RefCell, Deref, and Drop.",
    concept: "smart pointers"
  },
  {
    slug: "threads",
    title: "Threads",
    summary: "Run work concurrently and share data safely.",
    concept: "threads"
  },
  {
    slug: "macros",
    title: "Macros",
    summary: "Use and write macros that generate Rust code.",
    concept: "macros"
  },
  {
    slug: "clippy",
    title: "Clippy",
    summary: "Improve Rust code with Clippy lints and idiomatic suggestions.",
    concept: "Clippy"
  },
  {
    slug: "conversions",
    title: "Conversions",
    summary: "Convert values with From, Into, TryFrom, parsing, and formatting.",
    concept: "conversions"
  }
] as const;

export type Topic = (typeof roadmapTopics)[number]["slug"];
export type Difficulty = "Easy" | "Medium" | "Hard";

export const topics = roadmapTopics.map((topic) => topic.slug) as Topic[];

export function getTopicBySlug(slug: string) {
  return roadmapTopics.find((topic) => topic.slug === slug);
}

export function getTopicTitle(slug: string) {
  return getTopicBySlug(slug)?.title ?? slug;
}
