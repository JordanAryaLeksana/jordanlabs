import "server-only";

import {
  readFileSync,
  readdirSync,
} from "node:fs";

import path from "node:path";

import type {
  TrustedEvidence,
} from "@/lib/rag/evidence";

const KNOWLEDGE_DIRECTORY =
  path.join(
    process.cwd(),
    "content",
    "knowledge"
  );

let cachedKnowledgeEvidence:
  readonly TrustedEvidence[] | null =
  null;

export function getKnowledgeEvidence():
  readonly TrustedEvidence[] {
  if (cachedKnowledgeEvidence) {
    return cachedKnowledgeEvidence;
  }

  const directoryQueue = [
    KNOWLEDGE_DIRECTORY,
  ];

  const markdownPaths: string[] =
    [];

  while (
    directoryQueue.length > 0
  ) {
    const currentDirectory =
      directoryQueue.shift();

    if (!currentDirectory) {
      continue;
    }

    const entries =
      readdirSync(
        currentDirectory,
        {
          withFileTypes: true,
        }
      ).sort(
        (
          firstEntry,
          secondEntry
        ) =>
          firstEntry.name.localeCompare(
            secondEntry.name
          )
      );

    for (const entry of entries) {
      const entryPath =
        path.join(
          currentDirectory,
          entry.name
        );

      if (entry.isDirectory()) {
        directoryQueue.push(
          entryPath
        );

        continue;
      }

      if (
        entry.isFile() &&
        entry.name.endsWith(".md")
      ) {
        markdownPaths.push(
          entryPath
        );
      }
    }
  }

  markdownPaths.sort();

  const evidence:
    TrustedEvidence[] = [];

  for (
    const markdownPath
    of markdownPaths
  ) {
    const content =
      readFileSync(
        markdownPath,
        "utf-8"
      ).trim();

    if (content === "") {
      continue;
    }

    const relativePath =
      path
        .relative(
          KNOWLEDGE_DIRECTORY,
          markdownPath
        )
        .split(path.sep)
        .join("/");

    const documentHeading =
      content.match(
        /^#\s+(.+)$/m
      );

    const documentTitle =
      documentHeading?.[1]
        ?.trim() ??
      path.basename(
        markdownPath,
        ".md"
      );

    /*
     * Markdown heading digunakan sebagai
     * semantic chunk boundary.
     *
     * Kita tidak memakai fixed character
     * length supaya satu bagian konseptual
     * tidak terpotong secara arbitrer.
     */
    const sections =
      content
        .split(
          /(?=^#{1,6}\s+)/gm
        )
        .map(
          (section) =>
            section.trim()
        )
        .filter(
          (section) =>
            section !== ""
        );

    for (
      let sectionIndex = 0;
      sectionIndex <
      sections.length;
      sectionIndex += 1
    ) {
      const section =
        sections[
          sectionIndex
        ];

      const sectionHeading =
        section.match(
          /^#{1,6}\s+(.+)$/m
        );

      const sectionTitle =
        sectionHeading?.[1]
          ?.trim() ??
        documentTitle;

      const sectionBody =
        section
          .replace(
            /^#{1,6}\s+.+$/m,
            ""
          )
          .trim();

      /*
       * Heading tanpa content tidak
       * berguna sebagai retrieval evidence.
       */
      if (
        sectionBody === ""
      ) {
        continue;
      }

      evidence.push({
        sourceId:
          `${relativePath}#${sectionIndex + 1}`,

        sourcePath:
          relativePath,

        title:
          sectionTitle ===
          documentTitle
            ? documentTitle
            : `${documentTitle} — ${sectionTitle}`,

        content:
          section,
      });
    }
  }

  cachedKnowledgeEvidence =
    evidence;

  return cachedKnowledgeEvidence;
}