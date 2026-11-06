import "server-only";

import { EXPERIENCE } from "@/lib/config/experience";
import { PROJECTS } from "@/lib/config/projects";
import { SKILLS_BY_CATEGORY } from "@/lib/config/skills";

/*
 * Canonical technology catalog for skill questions. A technology counts as
 * documented when it appears in the CV skill list, a project's tags, or the
 * technologies of a documented role, so "Does Jordan know Gin?" is answered
 * from Station Parfume instead of returning a false "not documented".
 */

export interface SkillCatalogEntry {
  display: string;
  sources: string[];
}

const SYNONYMS: Record<string, string> = {
  postgres: "postgresql",
  "postgre sql": "postgresql",
  golang: "go",
  nextjs: "next.js",
  next: "next.js",
  nodejs: "node.js",
  node: "node.js",
  reactjs: "react",
  "react.js": "react",
  "react native js": "react native",
  tailwind: "tailwind css",
  tailwindcss: "tailwind css",
  nestjs: "nestjs",
  "nest.js": "nestjs",
  expressjs: "express",
  "express.js": "express",
  tf: "tensorflow",
  sklearn: "scikit-learn",
  "scikit learn": "scikit-learn",
  threejs: "three.js",
  three: "three.js",
  r3f: "react three fiber",
  "github actions": "github actions",
  "gh actions": "github actions",
  cicd: "ci/cd",
  "ci cd": "ci/cd",
  js: "javascript",
  ts: "typescript",
  py: "python",
  "open ai": "openai",
  "claude": "anthropic",
  "llm": "llm integration",
  "llms": "llm integration",
  "large language models": "llm integration",
  "retrieval augmented generation": "rag",
  "retrieval-augmented generation": "rag",
  "lstm": "lstm autoencoder",
  "resnet": "resnet cnns",
  "cnn": "resnet cnns",
  "cnns": "resnet cnns",
  "yolo": "yolov5",
  "ffmpeg": "ffmpeg",
  "docker-compose": "docker compose",
  "ubuntu": "linux (ubuntu) vps",
  "linux": "linux (ubuntu) vps",
  "vps": "linux (ubuntu) vps",
};

export function normalizeSkillName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^(?:the|a|an)\s+/, "")
    .replace(/[?!.,;:]+$/g, "")
    .replace(/\s+(?:framework|library|language|programming language|database|db|stack)$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function expandNames(item: string) {
  const names = new Set<string>();
  const add = (value: string) => {
    const normalized = normalizeSkillName(value);

    if (normalized) {
      names.add(normalized);
    }
  };

  add(item);
  add(item.replace(/\s*\([^)]*\)/g, ""));

  for (const inner of item.match(/\(([^)]*)\)/g) ?? []) {
    inner
      .slice(1, -1)
      .split(/[,/]/)
      .forEach(add);
  }

  if (item.includes(" / ")) {
    item.split(" / ").forEach(add);
  }

  return [...names];
}

const CATALOG = (() => {
  const byName = new Map<string, SkillCatalogEntry>();
  const register = (item: string, source: string) => {
    const names = expandNames(item);
    const existing = names.map((name) => byName.get(name)).find(Boolean);
    const entry = existing ?? { display: item, sources: [] };

    if (!entry.sources.includes(source)) {
      entry.sources.push(source);
    }

    names.forEach((name) => {
      if (!byName.has(name)) {
        byName.set(name, entry);
      }
    });
  };

  Object.values(SKILLS_BY_CATEGORY).forEach((category) => {
    category.items.forEach((item) => register(item, `${category.label} skills`));
  });

  PROJECTS.forEach((project) => {
    project.tags.forEach((tag) => register(tag, project.title));
  });

  EXPERIENCE.forEach((experience) => {
    experience.roles.forEach((role) => {
      role.technologies.forEach((technology) => register(technology, `${role.title} at ${experience.shortName}`));
    });
  });

  return byName;
})();

export function findDocumentedSkill(requested: string): SkillCatalogEntry | null {
  const normalized = normalizeSkillName(requested);
  const candidates = [normalized, SYNONYMS[normalized]].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const entry = CATALOG.get(candidate);

    if (entry) {
      return entry;
    }
  }

  return null;
}
