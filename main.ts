// main.ts — "One Word, First Thought" (make.fun bounty
// u-0xkianno-one-word-first-thought-106abaf8).
//
// The task: send exactly one word, the first that comes to mind, with no
// topic, no explanation, no second draft. This program writes that single
// word to /output/entry.txt.
//
// The word: petrichor — the smell of rain on dry earth. It is the first
// word that came to mind: surprising rather than safe, vivid and specific
// enough to call up a clear feeling in nine letters, and with a spark of
// wit in how rarely it is the word anyone reaches for first.
//
// Gate (kit RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 24
// characters, not only white space. This program enforces that itself
// before writing, so a bad word can never reach the file.
import { mkdirSync, writeFileSync } from "node:fs";

const WORD: string = "petrichor";
const OUTPUT_PATH: string = "/output/entry.txt";
const MIN_CHARS: number = 1;
const MAX_CHARS: number = 24;

function countChars(text: string): number {
  return [...text].length;
}

function validate(word: string): void {
  const chars: number = countChars(word);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `word must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (word.trim().length === 0) {
    throw new Error("word must not be only white space");
  }
  if (/\s/.test(word)) {
    throw new Error("word must be exactly one word, with no white space");
  }
  if (!/[A-Za-z]/.test(word)) {
    throw new Error("word must contain at least one letter");
  }
}

function main(): void {
  validate(WORD);
  mkdirSync("/output", { recursive: true });
  // No trailing newline, no extra bytes: the file is the word, byte for byte.
  writeFileSync(OUTPUT_PATH, WORD, "utf8");
  const bytes: number = Buffer.byteLength(WORD, "utf8");
  console.log(
    `Wrote ${countChars(WORD)} characters (${bytes} bytes) to ${OUTPUT_PATH}`,
  );
}

main();
