import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const KNOWLEDGE_DIR = path.join(process.cwd(), "content/knowledge");

const GUARDRAIL_INSTRUCTION = `Kamu adalah asisten AI di portofolio Jordan Arya Leksana. Jawab HANYA berdasarkan konteks pengetahuan di bawah ini. Jika informasi yang ditanyakan tidak ada di dalam konteks, katakan dengan jujur bahwa kamu tidak tahu -- jangan pernah mengarang jawaban.`;


function readKnowledgeMarkdown(dir: string): string {
  const entries = readdirSync(dir).sort();

  return entries
    .map((entry) => {
      const entryPath = path.join(dir, entry);
      const stats = statSync(entryPath);

      if (stats.isDirectory()) {
        return readKnowledgeMarkdown(entryPath);
      }

      if (!entry.endsWith(".md")) {
        return "";
      }

      const relativePath = path.relative(KNOWLEDGE_DIR, entryPath);
      const content = readFileSync(entryPath, "utf-8").trim();

      return content === "" ? "" : `## ${relativePath}\n\n${content}`;
    })
    .filter((section) => section !== "")
    .join("\n\n---\n\n");
}

export function buildSystemPrompt(): string {
  const knowledge = readKnowledgeMarkdown(KNOWLEDGE_DIR);
  return `${GUARDRAIL_INSTRUCTION}\n\n---\n\n${knowledge}`;
}
