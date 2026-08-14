export interface TrustedEvidence {
  sourceId: string;
  sourcePath: string;
  title: string;
  content: string;
}

export function formatTrustedEvidence(
  evidence: readonly TrustedEvidence[]
): string {
  return evidence
    .map((item) => {
      return `
SOURCE_ID: ${item.sourceId}

${item.content}
`.trim();
    })
    .join("\n\n---\n\n");
}