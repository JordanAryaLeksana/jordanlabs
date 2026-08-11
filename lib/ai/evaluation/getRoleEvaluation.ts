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

function getAiEngineerEvaluation(
  evidence: EvaluationEvidence
): EvaluationOutput {
  const hasAiInternship =
    evidence.experience.some(
      (experience) =>
        experience.roles.some(
          (role) =>
            role.title ===
            "AI Engineer Intern"
        )
    );

  const aiProjects =
    evidence.projects.filter(
      (project) =>
        project.category ===
          "Deep Learning" ||
        project.category ===
          "Computer Vision"
    );

  const aiSkills =
    evidence.skills.find(
      (group) =>
        group.category === "ai"
    );

  const programmingSkills =
    evidence.skills.find(
      (group) =>
        group.category ===
        "programming"
    );

  const hasPython =
    programmingSkills?.items.includes(
      "Python"
    ) ?? false;

  const evidenceScore = [
    hasAiInternship,
    aiProjects.length >= 2,
    (aiSkills?.items.length ?? 0) > 0,
    hasPython,
  ].filter(Boolean).length;

  const assessment:
    EvaluationAssessment =
      evidenceScore === 4
        ? "strong"
        : evidenceScore >= 2
          ? "moderate"
          : "limited";

  const strengths: string[] = [];

  if (hasAiInternship) {
    strengths.push(
      "Jordan has documented AI engineering experience through an AI Engineer internship at PT. Pertamina EP Cepu, including LSTM Autoencoder anomaly detection, supervised machine learning, and rule-based maintenance logic."
    );
  }

  const emqnet =
    evidence.projects.find(
      (project) =>
        project.id === "emqnet"
    );

  if (emqnet) {
    strengths.push(
      "EMQNET documents Jordan's work on a multi-task deep learning pipeline using Python and PyTorch for earthquake precursor analysis."
    );
  }

  const dermsight =
    evidence.projects.find(
      (project) =>
        project.id === "dermsight"
    );

  if (dermsight) {
    strengths.push(
      "DermSight documents computer-vision work involving CNN classification, image preprocessing, augmentation, and OpenCV."
    );
  }

  if (aiSkills) {
    strengths.push(
      `Jordan's documented AI / ML skills include ${aiSkills.items.join(", ")}.`
    );
  }

  if (hasPython) {
    strengths.push(
      "Python is documented in Jordan's programming skill set."
    );
  }

  return {
    assessment,

    summary:
      assessment === "strong"
        ? "Jordan has strong documented evidence of relevance to an AI Engineer role."
        : assessment === "moderate"
          ? "Jordan has meaningful documented evidence of relevance to an AI Engineer role, with important gaps remaining."
          : "Jordan's documented portfolio currently provides limited evidence for an AI Engineer role.",

    strengths,

    limitations: [
      "The portfolio does not establish proficiency, mastery, seniority, or expertise levels beyond the documented projects, skills, and experience.",
      "EMQNET is documented as a research project and DermSight as a prototype.",
      "Final hiring suitability depends on the specific role requirements, seniority expectations, interview performance, and evidence outside the portfolio.",
    ],
  };
}

function getSoftwareEngineerEvaluation(
  evidence: EvaluationEvidence
): EvaluationOutput {
  const hasSoftwareBackground =
    evidence.profile
      .previousExperience ===
    "Software Engineer";

  const hasFrontendLeadership =
    evidence.experience.some(
      (experience) =>
        experience.roles.some(
          (role) =>
            role.title ===
            "Tech Lead Frontend"
        )
    );

  const programmingSkills =
    evidence.skills.find(
      (group) =>
        group.category ===
        "programming"
    );

  const frontendSkills =
    evidence.skills.find(
      (group) =>
        group.category ===
        "frontend"
    );

  const backendSkills =
    evidence.skills.find(
      (group) =>
        group.category ===
        "backend"
    );

  const toolingSkills =
    evidence.skills.find(
      (group) =>
        group.category ===
        "tooling"
    );

  const hasProgrammingFoundation =
    (
      programmingSkills
        ?.items.length ?? 0
    ) > 0;

  const hasWebEngineeringSkills =
    (
      frontendSkills
        ?.items.length ?? 0
    ) > 0 &&
    (
      backendSkills
        ?.items.length ?? 0
    ) > 0;

  const evidenceScore = [
    hasSoftwareBackground,
    hasFrontendLeadership,
    hasProgrammingFoundation,
    hasWebEngineeringSkills,
  ].filter(Boolean).length;

  const assessment:
    EvaluationAssessment =
      evidenceScore === 4
        ? "strong"
        : evidenceScore >= 2
          ? "moderate"
          : "limited";

  const strengths: string[] = [];

  if (hasSoftwareBackground) {
    strengths.push(
      "Jordan's profile documents previous experience in software engineering before his current focus on AI engineering."
    );
  }

  if (hasFrontendLeadership) {
    strengths.push(
      "Jordan has documented Tech Lead Frontend experience at the Embedded System and Cyber Physical Laboratory, including reusable UI development and REST API integration."
    );
  }

  const projectManagementExperience =
    evidence.experience.find(
      (experience) =>
        experience.roles.some(
          (role) =>
            role.title ===
            "IT Project Manager"
        )
    );

  if (
    projectManagementExperience
  ) {
    strengths.push(
      "Jordan has documented software-delivery experience through IT Project Manager responsibilities involving Agile planning, requirements, developers, designers, and development priorities."
    );
  }

  if (programmingSkills) {
    strengths.push(
      `Jordan's documented programming skills include ${programmingSkills.items.join(", ")}.`
    );
  }

  if (
    frontendSkills &&
    backendSkills
  ) {
    strengths.push(
      `Jordan's documented web-development skills include frontend technologies such as ${frontendSkills.items.join(", ")} and backend technologies such as ${backendSkills.items.join(", ")}.`
    );
  }

  if (toolingSkills) {
    strengths.push(
      `Documented development tooling includes ${toolingSkills.items.join(", ")}.`
    );
  }

  return {
    assessment,

    summary:
      assessment === "strong"
        ? "Jordan has strong documented evidence of relevance to a Software Engineer role."
        : assessment === "moderate"
          ? "Jordan has meaningful documented evidence of relevance to a Software Engineer role, with important gaps remaining."
          : "Jordan's documented portfolio currently provides limited evidence for a Software Engineer role.",

    strengths,

    limitations: [
      "The portfolio does not establish proficiency, mastery, seniority, or expertise levels beyond the documented skills and experience.",
      "Some backend and tooling technologies are documented as skills without detailed professional contribution records for every technology.",
      "The current featured project catalog is primarily AI-focused and does not represent every software engineering contribution documented in Jordan's experience.",
      "Final hiring suitability depends on the specific role requirements, seniority expectations, interview performance, and evidence outside the portfolio.",
    ],
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