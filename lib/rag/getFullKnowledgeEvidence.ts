import "server-only";

import path from "node:path";

import {
  readKnowledgeMarkdown,
} from "@/lib/rag/readKnowledgeMarkdown";

const KNOWLEDGE_DIRECTORY =
  path.join(
    process.cwd(),
    "content",
    "knowledge"
  );

const FULL_KNOWLEDGE_EVIDENCE =
  readKnowledgeMarkdown(
    KNOWLEDGE_DIRECTORY,
    KNOWLEDGE_DIRECTORY
  );

export function getFullKnowledgeEvidence(): string {
  return FULL_KNOWLEDGE_EVIDENCE;
}