import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const judge0ApiUrl = process.env.JUDGE0_API_URL || "https://ce.judge0.com";
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
const questionBankPath = resolve(
  currentDir,
  "../../shared/interviewQuestions.json"
);
const questionBank = JSON.parse(readFileSync(questionBankPath, "utf8"));

function generateStarterCode(problem) {
  const { description, sampleInput, sampleOutput } = problem;
  const desc = description.toLowerCase();

  // Check for input reading patterns
  const needsInput = desc.includes('read') || sampleInput.trim().length > 0;
  const needsMultipleLines = sampleInput.includes('\n') || sampleOutput.includes('\n');

  // Check for specific patterns
  if (desc.includes('print') && desc.includes('three') && desc.includes('lines')) {
    return `fn main() {
    println!("line 1");
    println!("line 2");
    println!("line 3");
}`;
  }

  if (desc.includes('read') && desc.includes('name') && desc.includes('welcome')) {
    return `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let name = input.trim();
    println!("Hello, {}. Welcome to Rust.", name);
}`;
  }

  if (desc.includes('cargo command') && desc.includes('purpose')) {
    return `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let command = input.trim();

    match command {
        "build" => println!("compile the project into an executable"),
        "run" => println!("compile and execute the project"),
        "test" => println!("run the project's tests"),
        "check" => println!("check code without producing a final executable"),
        _ => println!("unknown"),
    }
}`;
  }

  if (desc.includes('minimal rust main function')) {
    return `fn main() {
    println!("Hello, world!");
}`;
  }

  if (desc.includes('compiler status') && desc.includes('warning')) {
    return `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let status = input.trim();

    match status {
        "success" => println!("the code compiled without issues"),
        "warning" => println!("read the warning and decide whether the code should be improved"),
        "error" => println!("fix the compilation error before proceeding"),
        _ => println!("unknown status"),
    }
}`;
  }

  if (desc.includes('filename') && desc.includes('belongs to')) {
    return `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let filename = input.trim();

    match filename {
        "Cargo.toml" => println!("package metadata"),
        "src/main.rs" => println!("binary source"),
        "src/lib.rs" => println!("library source"),
        _ => println!("another file"),
    }
}`;
  }

  if (desc.includes('count how many') && desc.includes('core rust goals')) {
    return `use std::io;
use std::collections::HashSet;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let words: Vec<&str> = input.trim().split_whitespace().collect();
    let rust_goals: HashSet<&str> = ["safety", "speed", "concurrency", "productivity"].iter().cloned().collect();
    
    let count = words.iter().filter(|word| rust_goals.contains(*word)).count();
    println!("{}", count);
}`;
  }

  if (desc.includes('tool name') && desc.includes('rustc') || desc.includes('cargo') || desc.includes('rustfmt') || desc.includes('clippy')) {
    return `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let tool = input.trim();

    match tool {
        "rustc" => println!("rustc is the Rust compiler"),
        "cargo" => println!("cargo is Rust's package manager and build tool"),
        "rustfmt" => println!("rustfmt formats Rust code according to style guidelines"),
        "clippy" => println!("clippy suggests idiomatic improvements and catches common mistakes"),
        _ => println!("unknown tool"),
    }
}`;
  }

  if (desc.includes('normalize aliases') && desc.includes('cargo commands')) {
    return `use std::io;
use std::collections::HashSet;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let actions: Vec<&str> = input.trim().split_whitespace().collect();
    
    let mut commands = Vec::new();
    let mut seen = HashSet::new();
    
    for action in actions {
        let cmd = match action {
            "compile" => "build",
            "execute" => "run", 
            "verify" => "test",
            other => other,
        };
        if !seen.contains(cmd) {
            seen.insert(cmd);
            commands.push(cmd);
        }
    }
    
    println!("{}", commands.join(" "));
}`;
  }

  if (desc.includes('comma-separated list') && desc.includes('checklist')) {
    return `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    
    let items: Vec<&str> = input.trim().split(',')
        .map(|s| s.trim())
        .filter(|s| !s.is_empty())
        .collect();
    
    for (i, item) in items.iter().enumerate() {
        println!("{}. {}", i + 1, item);
    }
}`;
  }

  if (desc.includes('compiler error category') && desc.includes('debugging step')) {
    return `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let category = input.trim();

    match category {
        "syntax" => println!("check for missing semicolons, brackets, or incorrect keywords"),
        "type" => println!("compare the expected type with the value being provided"),
        "borrow" => println!("ensure variables are not moved when they need to be borrowed"),
        "lifetime" => println!("add explicit lifetime annotations or restructure the code"),
        _ => println!("read the full diagnostic"),
    }
}`;
  }

  if (desc.includes('cargo output') && desc.includes('count')) {
    return `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut compiling = 0;
    let mut finished = 0;
    let mut running = 0;
    
    for line in stdin.lines() {
        let line = line.expect("Failed to read line");
        if line.starts_with("Compiling") {
            compiling += 1;
        } else if line.starts_with("Finished") {
            finished += 1;
        } else if line.starts_with("Running") {
            running += 1;
        }
    }
    
    println!("compiling={} finished={} running={}", compiling, finished, running);
}`;
  }

  // Default starter code for input/output problems
  if (needsInput) {
    if (needsMultipleLines) {
      return `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lines();
    
    // Read input here
    // let input = lines.next().unwrap().unwrap();
    
    // Process and print output
    println!("output");
}`;
    } else {
      return `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let input = input.trim();
    
    // Process input and print output
    println!("output");
}`;
    }
  }

  // Default for simple output problems
  return `fn main() {
    // Write your code here
    println!("output");
}`;
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/topics/question-counts", (_req, res) => {
  const topicSlugs = Array.from(
    new Set([
      ...Object.keys(questionBank.problems ?? {}),
      ...Object.keys(questionBank.mcqs ?? {})
    ])
  );

  const counts = topicSlugs.map((topic) => ({
    topic,
    problemCount: questionBank.problems?.[topic]?.length ?? 0,
    mcqCount: questionBank.mcqs?.[topic]?.length ?? 0
  }));

  return res.json({ counts });
});

app.get("/topics/:topic/problems", (req, res) => {
  const problems = questionBank.problems?.[req.params.topic];

  if (!problems) {
    return res.status(404).json({
      error: "No interview coding problems found for this topic yet."
    });
  }

  const problemsWithStarterCode = problems.map(problem => ({
    ...problem,
    starterCode: generateStarterCode(problem)
  }));

  return res.json({ problems: problemsWithStarterCode });
});

app.get("/topics/:topic/mcqs", (req, res) => {
  const mcqs = questionBank.mcqs?.[req.params.topic];

  if (!mcqs) {
    return res.status(404).json({
      error: "No interview MCQs found for this topic yet."
    });
  }

  return res.json({ mcqs });
});

app.get("/problems/:id", (req, res) => {
  const problemEntry = Object.entries(questionBank.problems ?? {}).find(
    ([, problems]) => problems.some((item) => item.id === req.params.id)
  );

  if (!problemEntry) {
    return res.status(404).json({
      error: "Problem not found."
    });
  }

  const [topic, problems] = problemEntry;
  const problem = problems.find((item) => item.id === req.params.id);

  return res.json({ 
    problem: {
      ...problem,
      starterCode: generateStarterCode(problem)
    }, 
    topic 
  });
});

app.post("/run", async (req, res) => {
  const { code, stdin = "" } = req.body ?? {};

  if (!code || typeof code !== "string") {
    return res.status(400).json({
      error: "Rust code is required in the `code` field."
    });
  }

  if (typeof stdin !== "string") {
    return res.status(400).json({
      error: "`stdin` must be a string when provided."
    });
  }

  const headers = {
    "Content-Type": "application/json"
  };

  if (process.env.JUDGE0_API_KEY) {
    headers["X-RapidAPI-Key"] = process.env.JUDGE0_API_KEY;
  }

  if (process.env.JUDGE0_API_HOST) {
    headers["X-RapidAPI-Host"] = process.env.JUDGE0_API_HOST;
  }

  try {
    const response = await fetch(
      `${judge0ApiUrl}/submissions?base64_encoded=false&wait=true&fields=stdout,stderr,compile_output,message,status`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          language_id: 73,
          source_code: code,
          stdin
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({
        error: "Judge0 request failed.",
        details: text
      });
    }

    const result = await response.json();

    return res.json({
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
      compile_output: result.compile_output ?? "",
      message: result.message ?? "",
      status: result.status?.description ?? "Unknown"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to run code.",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

if (process.argv[1] === currentFilePath) {
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
}

export { app };
