import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { ContactCard } from "@/components/pages/chat/resources/ContactCard";
import { isContactCardOutput } from "@/components/pages/chat/resources/isContactCardOutput";

export function ContactCardResult({ value }: { value: unknown }) {
  if (!isContactCardOutput(value)) return <div role="alert"><ChatMessageBubble role="assistant">The contact data could not be validated.</ChatMessageBubble></div>;
  return <ContactCard data={value} />;
}
