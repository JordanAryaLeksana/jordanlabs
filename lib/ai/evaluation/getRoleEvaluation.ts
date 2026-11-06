import "server-only";

import {
  getEvaluationEvidence,
} from "@/lib/ai/evaluation/getEvaluationEvidence";

export type EvaluationRole =
  | "ai-engineer"
  | "software-engineer";

export type EvaluationAssessment =
  | "strong"
  | "moderate"
  | "limited";

export interface EvaluationOutput {
  assessment: EvaluationAssessment;
  summary: string;
  strengths: string[];
  limitations: string[];
}

type EvaluationEvidence =
  ReturnType<
    typeof getEvaluationEvidence
  >;

type EvidenceProject =
  EvaluationEvidence["projects"][number];

/*
 * Every strength and limitation below is derived from the canonical
 * config (lib/config/*). No project, employer or metric is hardcoded,
 * so adding a project or a role updates the evaluation automatically.
 */

const BACKEND_TAGS = new Set([
  "Backend",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Go",
  "Gin",
  "Prisma",
  "NextAuth",
  "Flask",
  "Docker",
  "REST API",
]);

const AI_ROLE_PATTERN =
  /\b(?:ai|machine learning|deep learning|ml)\b/i;

const LEADERSHIP_ROLE_PATTERN =
  /\b(?:lead|manager)\b/i;

const ACADEMIC_ORGANIZATION_PATTERN =
  /\b(?:laborator(?:y|ium)|university|institut|ITS)\b/i;

function joinNames(names: string[]) {
  if (names.length <= 1) {
    return names.join("");
  }

  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function describeProject(project: EvidenceProject) {
  const proof = project.highlights.slice(0, 2);

  return proof.length > 0
    ? `${project.title} (${project.role}, ${project.status.toLowerCase()}): ${proof.join("; ")}.`
    : `${project.title} (${project.role}, ${project.status.toLowerCase()}): ${project.description}`;
}

function getSkillGroup(
  evidence: EvaluationEvidence,
  category: string
) {
  return evidence.skills.find(
    (group) => group.category === category
  );
}

function getAssessment(score: number, max: number): EvaluationAssessment {
  if (score >= max - 1) {
    return "strong";
  }

  return score >= 2 ? "moderate" : "limited";
}

function getSharedLimitations(
  evidence: EvaluationEvidence
) {
  const limitations = [
    "The portfolio documents projects, skills and roles; it does not establish proficiency, mastery or seniority levels beyond that evidence.",
  ];

  const hasFullTimeIndustryRole =
    evidence.experience.some(
      (experience) =>
        !ACADEMIC_ORGANIZATION_PATTERN.test(experience.organization) &&
        experience.roles.some(
          (role) => !/\bintern\b/i.test(role.title)
        )
    );

  if (!hasFullTimeIndustryRole) {
    limitations.push(
      "Documented professional experience is an industry internship plus university laboratory roles; no full-time industry position is documented yet."
    );
  }

  return limitations;
}

function getSoftwareEngineerEvaluation(
  evidence: EvaluationEvidence
): EvaluationOutput {
  const liveProjects =
    evidence.projects.filter(
      (project) => project.isLive
    );

  const backendProjects =
    evidence.projects.filter(
      (project) =>
        !project.isInDevelopment &&
        project.tags.some((tag) => BACKEND_TAGS.has(tag))
    );

  const leadershipRoles =
    evidence.experience.flatMap(
      (experience) =>
        experience.roles
          .filter((role) => LEADERSHIP_ROLE_PATTERN.test(role.title))
          .map((role) => `${role.title} at ${experience.shortName} (${role.period})`)
    );

  const programming = getSkillGroup(evidence, "programming");
  const frontend = getSkillGroup(evidence, "frontend");
  const backend = getSkillGroup(evidence, "backend");
  const database = getSkillGroup(evidence, "database");
  const tooling = getSkillGroup(evidence, "tooling");

  const hasFullStackSkills =
    (frontend?.items.length ?? 0) > 0 &&
    (backend?.items.length ?? 0) > 0 &&
    (database?.items.length ?? 0) > 0;

  const hasDeploymentTooling =
    tooling?.items.some((item) => /docker|ci\/cd|github actions/i.test(item)) ?? false;

  const score = [
    liveProjects.length >= 2,
    backendProjects.length >= 2,
    hasFullStackSkills,
    hasDeploymentTooling,
    leadershipRoles.length > 0,
  ].filter(Boolean).length;

  const assessment = getAssessment(score, 5);

  const strengths: string[] = [];

  if (liveProjects.length > 0) {
    strengths.push(
      `Jordan has ${liveProjects.length} documented web applications live in production: ${joinNames(liveProjects.map((project) => project.title))}.`
    );
  }

  for (const project of backendProjects.slice(0, 2)) {
    strengths.push(describeProject(project));
  }

  if (hasFullStackSkills) {
    strengths.push(
      `Documented full-stack skills: ${frontend?.items.slice(0, 4).join(", ")} on the frontend; ${backend?.items.slice(0, 5).join(", ")} on the backend; ${database?.items.join(", ")} for data.`
    );
  }

  if (hasDeploymentTooling && tooling) {
    strengths.push(
      `Deployment and DevOps tooling used in shipped projects: ${tooling.items.slice(0, 6).join(", ")}.`
    );
  }

  if (leadershipRoles.length > 0) {
    strengths.push(
      `Documented software leadership and delivery roles: ${joinNames(leadershipRoles)}.`
    );
  }

  const limitations = getSharedLimitations(evidence);

  const basicSkills =
    programming?.items.filter((item) => /\(basic\)/i.test(item)) ?? [];

  if (basicSkills.length > 0) {
    limitations.push(
      `${joinNames(basicSkills.map((item) => item.replace(/\s*\(basic\)/i, "")))} is documented at a basic level.`
    );
  }

  const inDevelopment =
    evidence.projects.filter(
      (project) => project.isInDevelopment
    );

  if (inDevelopment.length > 0) {
    limitations.push(
      `${joinNames(inDevelopment.map((project) => project.title))} is still in development and not in production yet.`
    );
  }

  limitations.push(
    "Final hiring suitability depends on the specific role requirements, seniority expectations, interviews and evidence outside the portfolio."
  );

  return {
    assessment,

    summary:
      assessment === "strong"
        ? "Jordan has strong documented evidence of relevance to a Software Engineer role, including shipped full-stack products and backend work."
        : assessment === "moderate"
          ? "Jordan has meaningful documented evidence of relevance to a Software Engineer role, with some gaps remaining."
          : "Jordan's documented portfolio currently provides limited evidence for a Software Engineer role.",

    strengths,
    limitations,
  };
}

function getAiEngineerEvaluation(
  evidence: EvaluationEvidence
): EvaluationOutput {
  const aiRoles =
    evidence.experience.flatMap(
      (experience) =>
        experience.roles
          .filter((role) => AI_ROLE_PATTERN.test(role.title))
          .map((role) => ({ ...role, organization: experience.organization }))
    );

  const aiProjects =
    evidence.projects.filter(
      (project) => project.tags.includes("AI")
    );

  const liveAiProjects =
    aiProjects.filter(
      (project) => project.isLive
    );

  const llmProjects =
    aiProjects.filter(
      (project) =>
        project.tags.some((tag) => /rag|llm/i.test(tag)) ||
        /\b(?:llm|rag|muse|language model)\b/i.test(`${project.approach} ${project.architecture}`)
    );

  const aiSkills = getSkillGroup(evidence, "ai");

  const score = [
    aiRoles.length > 0,
    aiProjects.length >= 2,
    liveAiProjects.length > 0,
    llmProjects.length > 0,
    (aiSkills?.items.length ?? 0) > 0,
  ].filter(Boolean).length;

  const assessment = getAssessment(score, 5);

  const strengths: string[] = [];

  for (const role of aiRoles) {
    strengths.push(
      `${role.title} at ${role.organization} (${role.period}): ${role.contributions[0]}`
    );
  }

  if (llmProjects.length > 0) {
    strengths.push(
      `LLM and RAG integration in real products: ${joinNames(llmProjects.map((project) => project.title))}.`
    );
  }

  const featuredAiProject =
    aiProjects.find(
      (project) => project.highlights.length > 0
    );

  if (featuredAiProject) {
    strengths.push(describeProject(featuredAiProject));
  }

  if (aiSkills) {
    strengths.push(
      `Documented AI / ML skills: ${aiSkills.items.join(", ")}.`
    );
  }

  const limitations = getSharedLimitations(evidence);

  const nonProductionAiProjects =
    aiProjects.filter(
      (project) => !project.isLive
    );

  if (nonProductionAiProjects.length > 0) {
    limitations.push(
      `Not every AI project runs in production: ${joinNames(nonProductionAiProjects.map((project) => `${project.title} (${project.status.toLowerCase()})`))}.`
    );
  }

  limitations.push(
    "Final hiring suitability depends on the specific role requirements, seniority expectations, interviews and evidence outside the portfolio."
  );

  return {
    assessment,

    summary:
      assessment === "strong"
        ? "Jordan has strong documented evidence of relevance to an AI Engineer role, from industrial ML to LLM products."
        : assessment === "moderate"
          ? "Jordan has meaningful documented evidence of relevance to an AI Engineer role, with some gaps remaining."
          : "Jordan's documented portfolio currently provides limited evidence for an AI Engineer role.",

    strengths,
    limitations,
  };
}

export function getRoleEvaluation(
  role: EvaluationRole
): EvaluationOutput {
  const evidence =
    getEvaluationEvidence();

  if (
    role === "software-engineer"
  ) {
    return getSoftwareEngineerEvaluation(
      evidence
    );
  }

  return getAiEngineerEvaluation(
    evidence
  );
}
