import "server-only";

import { ollama } from "ai-sdk-ollama";

export function getChatModel() {
  const modelName = process.env.OLLAMA_MODEL;

  if (!modelName) {
    throw new Error(
      "OLLAMA_MODEL belum dikonfigurasi di .env.local."
    );
  }

  return ollama(modelName);
}