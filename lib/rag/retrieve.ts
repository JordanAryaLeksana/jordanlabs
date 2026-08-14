import "server-only";

import {
  cosineSimilarity,
  embed,
  embedMany,
} from "ai";

import {
  getEmbeddingsModel,
} from "@/lib/ai/model";

import type {
  TrustedEvidence,
} from "@/lib/rag/evidence";

import {
  getKnowledgeEvidence,
} from "@/lib/rag/knowledge";

interface RetrievePortfolioEvidenceOptions {
  query: string;
  limit?: number;
}

const QUERY_STOP_WORDS =
  new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "can",
    "did",
    "do",
    "does",
    "for",
    "from",
    "has",
    "have",
    "he",
    "his",
    "how",
    "i",
    "in",
    "is",
    "it",
    "me",
    "of",
    "on",
    "or",
    "that",
    "the",
    "this",
    "to",
    "use",
    "uses",
    "what",
    "when",
    "where",
    "which",
    "who",
    "why",
    "with",

    "ada",
    "adalah",
    "apa",
    "apakah",
    "bagaimana",
    "dan",
    "dari",
    "di",
    "dia",
    "dengan",
    "ini",
    "itu",
    "jordan",
    "ke",
    "milik",
    "pakai",
    "pada",
    "tentang",
    "untuk",
    "yang",
  ]);

const SEMANTIC_WEIGHT =
  0.65;

const LEXICAL_WEIGHT =
  0.35;

/*
 * Threshold awal, bukan nilai final.
 * Nilai ini akan kita kalibrasi
 * melalui retrieval regression Phase 2D.
 */
const MIN_SEMANTIC_SIMILARITY =
  0.35;

let cachedKnowledgeEmbeddings:
  readonly number[][] | null =
  null;

export async function retrievePortfolioEvidence({
  query,
  limit = 5,
}: RetrievePortfolioEvidenceOptions):
  Promise<
    readonly TrustedEvidence[]
  > {
  const normalizedQuery =
    query
      .toLowerCase()
      .trim();

  if (
    normalizedQuery === ""
  ) {
    return [];
  }

  const knowledge =
    getKnowledgeEvidence();

  if (
    knowledge.length === 0
  ) {
    return [];
  }

  const rawTerms =
    normalizedQuery.match(
      /[a-z0-9][a-z0-9+#./-]*/g
    ) ?? [];

  const queryTerms: string[] =
    [];

  for (
    const term of rawTerms
  ) {
    if (
      QUERY_STOP_WORDS.has(
        term
      )
    ) {
      continue;
    }

    if (
      term.length < 3 &&
      term !== "ai" &&
      term !== "ml" &&
      term !== "c#" &&
      term !== "c++"
    ) {
      continue;
    }

    if (
      !queryTerms.includes(
        term
      )
    ) {
      queryTerms.push(
        term
      );
    }
  }

  const lexicalScores =
    new Map<
      string,
      number
    >();

  let maximumLexicalScore = 0;

  for (
    const item of knowledge
  ) {
    const normalizedTitle =
      item.title
        .toLowerCase();

    const normalizedPath =
      item.sourcePath
        .toLowerCase();

    const normalizedContent =
      item.content
        .toLowerCase();

    let score = 0;

    if (
      normalizedTitle.includes(
        normalizedQuery
      )
    ) {
      score += 10;
    }

    if (
      normalizedContent.includes(
        normalizedQuery
      )
    ) {
      score += 8;
    }

    for (
      const term of queryTerms
    ) {
      if (
        normalizedTitle.includes(
          term
        )
      ) {
        score += 5;
      }

      if (
        normalizedPath.includes(
          term
        )
      ) {
        score += 4;
      }

      if (
        normalizedContent.includes(
          term
        )
      ) {
        score += 1;
      }
    }

    lexicalScores.set(
      item.sourceId,
      score
    );

    if (
      score >
      maximumLexicalScore
    ) {
      maximumLexicalScore =
        score;
    }
  }

  /*
   * Hindari semantic retrieval untuk
   * pertanyaan general yang tidak punya
   * hubungan lexical dengan portfolio.
   *
   * Contoh:
   * "What is Kubernetes?"
   *
   * Tetapi query tentang Jordan tetap
   * boleh menggunakan semantic retrieval
   * meskipun lexical overlap rendah.
   */
  const hasPortfolioSignal =
    maximumLexicalScore > 0 ||
    /\bjordan\b/i.test(
      query
    );

  if (!hasPortfolioSignal) {
    return [];
  }

  try {
    if (
      !cachedKnowledgeEmbeddings ||
      cachedKnowledgeEmbeddings.length !==
      knowledge.length
    ) {
      const {
        embeddings,
      } = await embedMany({
        model:
          getEmbeddingsModel(),

        values:
          knowledge.map(
            (item) => {
              return (
                `title: ${item.title} | ` +
                `text: ${item.content}`
              );
            }
          ),
      });

      cachedKnowledgeEmbeddings =
        embeddings;
    }

    const {
      embedding:
      queryEmbedding,
    } = await embed({
      model:
        getEmbeddingsModel(),

      value:
        `task: question answering | query: ${query}`,
    });
    const semanticCandidates: {
      evidence:
      TrustedEvidence;
      lexicalScore:
      number;
      semanticScore:
      number;
    }[] = [];

    const rankedEvidence: {
      evidence:
      TrustedEvidence;
      lexicalScore:
      number;
      semanticScore:
      number;
      hybridScore:
      number;
    }[] = [];

    for (
      let index = 0;
      index <
      knowledge.length;
      index += 1
    ) {
      const item =
        knowledge[index];

      const knowledgeEmbedding =
        cachedKnowledgeEmbeddings[
        index
        ];

      if (
        !knowledgeEmbedding
      ) {
        continue;
      }

      const rawLexicalScore =
        lexicalScores.get(
          item.sourceId
        ) ?? 0;

      const normalizedLexicalScore =
        maximumLexicalScore > 0
          ? rawLexicalScore /
          maximumLexicalScore
          : 0;

      const semanticScore =
        cosineSimilarity(
          queryEmbedding,
          knowledgeEmbedding
        );

      semanticCandidates.push({
        evidence:
          item,

        lexicalScore:
          normalizedLexicalScore,

        semanticScore,
      });
      /*
       * Evidence tetap boleh masuk jika:
       *
       * - punya lexical match, atau
       * - semantic similarity cukup kuat.
       */
      if (
        rawLexicalScore <= 0 &&
        semanticScore <
        MIN_SEMANTIC_SIMILARITY
      ) {
        continue;
      }

      const hybridScore =
        (
          semanticScore *
          SEMANTIC_WEIGHT
        ) +
        (
          normalizedLexicalScore *
          LEXICAL_WEIGHT
        );

      rankedEvidence.push({
        evidence:
          item,

        lexicalScore:
          normalizedLexicalScore,

        semanticScore,

        hybridScore,
      });
    }

    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      const strongestSemanticCandidates =
        semanticCandidates
          .toSorted(
            (
              firstResult,
              secondResult
            ) =>
              secondResult.semanticScore -
              firstResult.semanticScore
          )
          .slice(0, 5);

      console.log(
        "Portfolio semantic candidates:",
        strongestSemanticCandidates.map(
          (result) => ({
            sourceId:
              result.evidence.sourceId,

            title:
              result.evidence.title,

            lexicalScore:
              Number(
                result.lexicalScore.toFixed(
                  3
                )
              ),

            semanticScore:
              Number(
                result.semanticScore.toFixed(
                  3
                )
              ),
          })
        )
      );
    }

    rankedEvidence.sort(
      (
        firstResult,
        secondResult
      ) => {
        if (
          firstResult.hybridScore !==
          secondResult.hybridScore
        ) {
          return (
            secondResult.hybridScore -
            firstResult.hybridScore
          );
        }

        return firstResult
          .evidence
          .sourceId
          .localeCompare(
            secondResult
              .evidence
              .sourceId
          );
      }
    );

    const selectedEvidence =
      rankedEvidence
        .slice(
          0,
          Math.max(
            1,
            limit
          )
        );

    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio hybrid retrieval ranking:",
        selectedEvidence.map(
          (result) => ({
            sourceId:
              result.evidence
                .sourceId,

            title:
              result.evidence
                .title,

            lexicalScore:
              Number(
                result
                  .lexicalScore
                  .toFixed(3)
              ),

            semanticScore:
              Number(
                result
                  .semanticScore
                  .toFixed(3)
              ),

            hybridScore:
              Number(
                result
                  .hybridScore
                  .toFixed(3)
              ),
          })
        )
      );
    }

    return selectedEvidence.map(
      (result) =>
        result.evidence
    );
  } catch (error) {
    /*
     * Semantic retrieval tidak boleh
     * menjatuhkan seluruh chat.
     *
     * Jika Ollama embedding model gagal,
     * lexical retrieval tetap menjadi
     * deterministic fallback.
     */
    console.error(
      "Portfolio semantic retrieval failed:",
      error
    );

    const lexicalFallback =
      knowledge
        .map((item) => {
          return {
            evidence:
              item,

            score:
              lexicalScores.get(
                item.sourceId
              ) ?? 0,
          };
        })
        .filter(
          (result) =>
            result.score > 0
        )
        .sort(
          (
            firstResult,
            secondResult
          ) => {
            if (
              firstResult.score !==
              secondResult.score
            ) {
              return (
                secondResult.score -
                firstResult.score
              );
            }

            return firstResult
              .evidence
              .sourceId
              .localeCompare(
                secondResult
                  .evidence
                  .sourceId
              );
          }
        );

    return lexicalFallback
      .slice(
        0,
        Math.max(
          1,
          limit
        )
      )
      .map(
        (result) =>
          result.evidence
      );
  }
}