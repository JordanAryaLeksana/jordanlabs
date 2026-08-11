import "server-only";

const AI_EXPERIENCE_DURATION_PATTERNS = [
  /\bhow\s+(?:many|much)\s+(?:years?|months?)\b.*\b(?:ai|machine learning|ml)\s+engineer\b.*\bexperience\b/i,

  /\bhow\s+long\b.*\bjordan\b.*\b(?:ai|machine learning|ml)\s+engineer\b/i,

  /\bberapa\s+(?:tahun|lama)\b.*\bpengalaman\b.*\b(?:ai|machine learning|ml)\s+engineer\b/i,

  /\bberapa\s+lama\b.*\bjordan\b.*\b(?:sebagai|jadi)\s+(?:ai|machine learning|ml)\s+engineer\b/i,
];

export function isAiExperienceDurationQuery(
  userText: string
): boolean {
  return AI_EXPERIENCE_DURATION_PATTERNS.some(
    (pattern) =>
      pattern.test(userText)
  );
}
