import { PROJECTS, type Project } from "@/lib/config/projects";

/*
 * One place for "does this text mention a project?".
 * Matching is word-boundary based, so short ids never match inside
 * other words (for example "teta" inside the Indonesian word "tetap").
 */

export function normalizeMatchText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/[—–]/g, "-");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getProjectTerms(project: Project) {
  const terms = new Set<string>();
  const add = (value: string | undefined) => {
    const normalized = value ? normalizeMatchText(value).trim() : "";

    if (normalized.length >= 3) {
      terms.add(normalized);
      terms.add(normalized.replace(/-/g, " "));
    }
  };

  add(project.title);
  add(project.title.split(" - ")[0]);
  add(project.id);
  add(project.slug);
  project.aliases?.forEach(add);

  return [...terms];
}

const PROJECT_TERMS = PROJECTS.map((project) => ({
  project,
  patterns: getProjectTerms(project).map(
    (term) => new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(term)}(?:$|[^a-z0-9])`, "i")
  ),
  terms: getProjectTerms(project),
}));

/** Projects whose title, id, slug or alias appears as a whole term in the text. */
export function findMentionedProjects(text: string): Project[] {
  const normalized = normalizeMatchText(text);

  return PROJECT_TERMS
    .filter(({ patterns }) => patterns.some((pattern) => pattern.test(normalized)))
    .map(({ project }) => project);
}

/** True when the whole name equals a documented project title, id, slug or alias. */
export function isDocumentedProjectName(name: string) {
  const normalized = normalizeMatchText(name).trim().replace(/\s+/g, " ");

  return PROJECT_TERMS.some(({ terms }) =>
    terms.some((term) => term === normalized || term === normalized.replace(/\s/g, "-"))
  );
}
