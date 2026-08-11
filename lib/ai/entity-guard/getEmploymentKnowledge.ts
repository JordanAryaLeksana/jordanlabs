import "server-only";

import {
  EXPERIENCE,
} from "@/lib/config/experience";

export interface EmploymentKnowledgeResult {
  organizationName: string;
  documented: boolean;
}

const EMPLOYMENT_QUERY_PATTERNS = [
  /\bdid\s+jordan\s+work\s+(?:at|for)\s+(.+?)(?:\?|$)/i,
  /\bhas\s+jordan\s+worked\s+(?:at|for)\s+(.+?)(?:\?|$)/i,
  /\bdoes\s+jordan\s+work\s+(?:at|for)\s+(.+?)(?:\?|$)/i,

  /\bapakah\s+jordan\s+pernah\s+bekerja\s+di\s+(.+?)(?:\?|$)/i,
  /\bpernahkah\s+jordan\s+bekerja\s+di\s+(.+?)(?:\?|$)/i,
];

export function getEmploymentKnowledge(
  userText: string
): EmploymentKnowledgeResult | null {
  for (
    const pattern of
    EMPLOYMENT_QUERY_PATTERNS
  ) {
    const match =
      userText.match(pattern);

    const requestedOrganization =
      match?.[1]?.trim();

    if (!requestedOrganization) {
      continue;
    }

    const normalizedRequested =
      requestedOrganization
        .toLowerCase()
        .replace(/[.,!?]+$/g, "")
        .trim();

    const documentedOrganization =
      EXPERIENCE.find(
        (experience) =>
          experience.organization
            .toLowerCase() ===
          normalizedRequested
      );

    return {
      organizationName:
        documentedOrganization
          ?.organization ??
        requestedOrganization,

      documented:
        documentedOrganization !==
        undefined,
    };
  }

  return null;
}
