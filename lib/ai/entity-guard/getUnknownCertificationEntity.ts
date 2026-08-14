import "server-only";

import {
  getKnowledgeEvidence,
} from "@/lib/rag/knowledge";

export interface UnknownCertificationEntity {
  certificationName: string;
}

const VERIFIED_KNOWLEDGE =
  getKnowledgeEvidence()
    .map((item) => {
      return item.content;
    })
    .join("\n")
    .toLowerCase();

const CERTIFICATION_QUERY_PATTERNS = [
  /\bwhat\s+(.+?)\s+certifications?\s+does\s+jordan\s+have(?:\?|$)/i,

  /\bdoes\s+jordan\s+have\s+(?:an?\s+)?(.+?)\s+certification(?:\?|$)/i,

  /\bapakah\s+jordan\s+(?:punya|memiliki)\s+sertifikasi\s+(.+?)(?:\?|$)/i,

  /\bsertifikasi\s+(.+?)\s+apa\s+yang\s+jordan\s+(?:punya|miliki)(?:\?|$)/i,
];

export function getUnknownCertificationEntity(
  userText: string
): UnknownCertificationEntity | null {
  for (
    const pattern of
    CERTIFICATION_QUERY_PATTERNS
  ) {
    const match =
      userText.match(pattern);

    const requestedCertification =
      match?.[1]?.trim();

    if (!requestedCertification) {
      continue;
    }

    const normalizedCertification =
      requestedCertification
        .toLowerCase()
        .replace(/[.,!?]+$/g, "")
        .trim();

    /*
     * Guard ini hanya memastikan entity yang benar-benar
     * tidak terdapat di verified knowledge dihentikan.
     *
     * Jika istilah ditemukan, grounded path berikutnya tetap
     * menentukan konteks sebenarnya tanpa guard membuat asumsi.
     */
    if (
      VERIFIED_KNOWLEDGE.includes(
        normalizedCertification
      )
    ) {
      return null;
    }

    return {
      certificationName:
        requestedCertification,
    };
  }

  return null;
}