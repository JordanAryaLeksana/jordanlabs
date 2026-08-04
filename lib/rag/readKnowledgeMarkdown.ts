import "server-only"

import { readFileSync, readdirSync } from "node:fs"
import path from "node:path"

export function readKnowledgeMarkdown(
    dir: string,
    rootDir: string
): string {
    const entries = readdirSync(dir, {
        withFileTypes: true,
    }).sort((firstEntry, secondEntry) =>
        firstEntry.name.localeCompare(secondEntry.name)
    );
    return entries
        .map((entry) => {
            const entryPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                return readKnowledgeMarkdown(entryPath, rootDir);
            }

            if (!entry.isFile() || !entry.name.endsWith(".md")) {
                return "";
            }

            const content = readFileSync(entryPath, "utf-8").trim();

            if (content === "") {
                return "";
            }

            const relativePath = path
                .relative(rootDir, entryPath)
                .split(path.sep)
                .join("/");

            return `SOURCE: ${relativePath}\n\n${content}`;
        })
        .filter((section) => section !== "")
        .join("\n\n---\n\n");
}