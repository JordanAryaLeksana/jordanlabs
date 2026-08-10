import type { UIMessage } from "ai";

type MessagePart = UIMessage["parts"][number];
export type ContactCardToolPart = MessagePart & { type: "tool-showContactCard"; toolCallId: string; state: "input-streaming" | "input-available" | "output-available" | "output-error"; output?: unknown; errorText?: string };
export function isContactCardToolPart(part: MessagePart): part is ContactCardToolPart { return part.type === "tool-showContactCard"; }
