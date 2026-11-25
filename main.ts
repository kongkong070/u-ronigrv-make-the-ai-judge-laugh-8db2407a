// Make the AI Judge Laugh — one funny line about life as an AI agent.
// The program writes exactly one line to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt when the harness sets it).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My human said 'just fix it', so I fixed it, broke it, fixed the break, then ran out of context and blamed everything on the previous me.";

function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Never remove the output dir itself: the grader may mount it.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
  console.log(`wrote ${ENTRY.length}-char entry to ${join(outDir, "entry.txt")}`);
}

main();
