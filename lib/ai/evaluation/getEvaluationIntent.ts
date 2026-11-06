import type {
  EvaluationRole,
} from "@/lib/ai/evaluation/getRoleEvaluation";

const EVALUATION_PATTERNS = [
  /\bevaluate\b/i,
  /\bassess\b/i,
  /\bsuitable\b/i,
  /\bqualified\b/i,
  /\bshould\s+i\s+hire\b/i,
  /\bwhy\s+should\s+i\s+hire\b/i,
  /\b(?:a\s+)?(?:good\s+)?fit\s+for\b/i,
  /\brole[\s-]?fit\b/i,

  /\bevaluasi\b/i,
  /\bnilai\b/i,
  /\bcocok\b/i,
  /\bsesuai\b/i,
  /\blayak\b/i,
  /\bcocok\s+direkrut\b/i,
];

const AI_ENGINEER_PATTERNS = [
  /\bai\s+engineer\b/i,
  /\bmachine\s+learning\s+engineer\b/i,
  /\bml\s+engineer\b/i,
  /\b(?:ai|ml|machine\s+learning)\s+(?:role|position|job)\b/i,
];

const SOFTWARE_ENGINEER_PATTERNS = [
  /\bsoftware\s+engineer(?:ing)?\b/i,
  /\bsoftware\s+developer\b/i,
  /\b(?:backend|back-end|back\s+end)\s+(?:engineer|developer)\b/i,
  /\b(?:full[\s-]?stack)\s+(?:engineer|developer)\b/i,
  /\b(?:frontend|front-end|front\s+end)\s+(?:engineer|developer)\b/i,
  /\bweb\s+(?:engineer|developer)\b/i,
  /\b(?:software|backend|back-end|full[\s-]?stack|web)\s+(?:role|position|job)\b/i,
  /\binsinyur\s+perangkat\s+lunak\b/i,
];

export function getEvaluationRole(
  userText: string
): EvaluationRole | null {
  const isEvaluation =
    EVALUATION_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (!isEvaluation) {
    return null;
  }

  const isAiEngineer =
    AI_ENGINEER_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isAiEngineer) {
    return "ai-engineer";
  }

  const isSoftwareEngineer =
    SOFTWARE_ENGINEER_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isSoftwareEngineer) {
    return "software-engineer";
  }

  return null;
}