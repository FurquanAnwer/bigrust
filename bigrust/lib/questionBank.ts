import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const questionBankPath = process.env.QUESTION_BANK_PATH
  ? resolve(process.env.QUESTION_BANK_PATH)
  : resolve(process.cwd(), "interviewQuestions.json");

export const questionBank = JSON.parse(readFileSync(questionBankPath, "utf8"));