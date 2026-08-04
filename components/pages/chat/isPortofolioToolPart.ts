export interface PortfolioToolPart {
  type: `tool-${string}`;
  state: string;
  toolCallId?: string;
  output?: unknown;
  errorText?: string;
}

export function isPortfolioToolPart(
  value: unknown
): value is PortfolioToolPart {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.type === "string" &&
    candidate.type.startsWith("tool-") &&
    typeof candidate.state === "string"
  );
}