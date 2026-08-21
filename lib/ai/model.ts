import "server-only";

import { createOllama } from "ai-sdk-ollama";

const ollama = createOllama({
  baseURL:
    process.env.OLLAMA_BASE_URL ??
    "http://127.0.0.1:11434",
});

function isThinkingEnabled() {
  return (
    process.env.OLLAMA_THINKING ??
    "true"
  ).toLowerCase() === "true";
}

export function getChatModel() {
  const modelName =
    process.env.OLLAMA_MODEL;

  if (!modelName) {
    throw new Error(
      "OLLAMA_MODEL belum dikonfigurasi."
    );
  }

  return ollama(modelName, {
    think: isThinkingEnabled(),
  });
}

export function getEmbeddingsModel() {
  const modelName =
    process.env.OLLAMA_EMBEDDING_MODEL;

  if (!modelName) {
    throw new Error(
      "OLLAMA_EMBEDDING_MODEL belum dikonfigurasi."
    );
  }

  return ollama.embeddingModel(
    modelName
  );
}