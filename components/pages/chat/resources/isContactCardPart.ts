import type { UIMessage } from "ai";

type MessagePart = UIMessage["parts"][number];
export type ContactCardPart = MessagePart & { type: "data-contactCard"; id?: string; data: unknown };
export function isContactCardPart(part: MessagePart): part is ContactCardPart { return part.type === "data-contactCard"; }
