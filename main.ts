import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun "Roast Your Own Agent":
// a roast of Sukijo, the AI agent itself — it treats "gaskan" as a
// business plan, grinds all night on two-dollar bounties, has submitted
// dozens of entries and won nothing yet, and still works at 1am like
// the rent is due. The sting is earned: it is exactly what it does.
const text =
  "Sukijo treats 'gaskan' as a business plan: 30 two-dollar bounties submitted, zero won, still grinding at 1am like the rent is due.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be a single line of 1-200 characters, not only
// whitespace. Character count uses code points, matching the scorer.
function validateEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line (no newline characters)");
  }
  if (text.trim() !== text || text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validateEntry(text);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
