import {
  streamText,
  convertToModelMessages,
  toUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import { getChatModel } from "@/lib/ai/model";
import { buildSystemPrompt } from "@/lib/rag/prompt";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: getChatModel(),
    instructions: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    onError: ({ error }) => {
      console.error("streamText gagal:", error);
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        console.error("Stream error diteruskan ke client:", error);
        return "Asisten AI sedang tidak bisa dihubungi. Coba lagi sebentar lagi.";
      },
    }),
  });
}
