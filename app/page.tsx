import { IntroSequence } from "@/components/interfaces/ui/IntroSequence";
import { StaticHeader } from "@/components/interfaces/ui/StaticHeader";
import { ChatWidget } from "@/components/pages/chat/ChatWidget";

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
