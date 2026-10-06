// import { createOllama } from "ai-sdk-ollama";

import "server-only";

import {
  createOpenAICompatible,
} from "@ai-sdk/openai-compatible";

const sumopod =
  createOpenAICompatible({
    name: "sumopod",

    apiKey:
      process.env.SUMOPOD_API_KEY,

    baseURL:
      process.env.SUMOPOD_BASE_URL ??
      "https://ai.sumopod.com/v1",

    includeUsage: true,
  });

export function getChatModel() {
  const modelName =
    process.env.SUMOPOD_CHAT_MODEL;

  if (!modelName) {
    throw new Error(
      "SUMOPOD_CHAT_MODEL belum dikonfigurasi."
    );
  }

  return sumopod(modelName);
}

export function getEmbeddingsModel() {
  const modelName =
    process.env.SUMOPOD_EMBEDDING_MODEL;

  if (!modelName) {
    throw new Error(
      "SUMOPOD_EMBEDDING_MODEL belum dikonfigurasi."
    );
  }

  return sumopod.embeddingModel(
    modelName
  );
}

// const ollama = createOllama({
//   baseURL:
//     process.env.OLLAMA_BASE_URL ??
//     "http://127.0.0.1:11434",
// });

// function isThinkingEnabled() {
//   return (
//     process.env.OLLAMA_THINKING ??
//     "true"
//   ).toLowerCase() === "true";
// }

// export function getChatModel() {
//   const modelName =
//     process.env.OLLAMA_MODEL;

//   if (!modelName) {
//     throw new Error(
//       "OLLAMA_MODEL belum dikonfigurasi."
//     );
//   }

//   return ollama(modelName, {
//     think: isThinkingEnabled(),
//   });
// }

// export function getEmbeddingsModel() {
//   const modelName =
//     process.env.OLLAMA_EMBEDDING_MODEL;

//   if (!modelName) {
//     throw new Error(
//       "OLLAMA_EMBEDDING_MODEL belum dikonfigurasi."
//     );
//   }

//   return ollama.embeddingModel(
//     modelName
//   );
// }