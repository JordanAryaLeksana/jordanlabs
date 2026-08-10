import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { ContactCardResult } from "@/components/pages/chat/resources/ContactCardResult";
import type { ContactCardToolPart } from "@/components/pages/chat/resources/isContactCardToolPart";

export function ContactCardToolRenderer({ part }: { part: ContactCardToolPart }) {
  if (part.state === "input-streaming" || part.state === "input-available") return <div role="status"><ChatMessageBubble role="assistant">Preparing Jordan&apos;s contact card…</ChatMessageBubble></div>;
  if (part.state === "output-error") return <div role="alert"><ChatMessageBubble role="assistant">{part.errorText ?? "The contact card could not be prepared."}</ChatMessageBubble></div>;
  if (part.state === "output-available") return <ContactCardResult value={part.output} />;
  return null;
}
