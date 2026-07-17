import { ollama } from "ai-sdk-ollama";

export function getChatModel() {
  return ollama(process.env.OLLAMA_MODEL ?? "qwen3:8b");
}
