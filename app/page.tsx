import { IntroSequence } from "@/components/layout/IntroSequence";
import { StaticHeader } from "@/components/layout/StaticHeader";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <IntroSequence>
      <div className="flex h-dvh flex-col">
        <StaticHeader />
        <ChatWidget className="min-h-0 flex-1" />
      </div>
    </IntroSequence>
  );
  
}
