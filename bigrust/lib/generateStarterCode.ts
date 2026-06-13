export function generateStarterCode(problem: any) {
  const { description, sampleInput, sampleOutput } = problem;
  const desc = description.toLowerCase();

  const needsInput = desc.includes("read") || sampleInput.trim().length > 0;
  const needsMultipleLines =
    sampleInput.includes("\n") || sampleOutput.includes("\n");

  // paste your existing full function body here

  return `fn main() {
    // Write your code here
    println!("output");
}`;
}