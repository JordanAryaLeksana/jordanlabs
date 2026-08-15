import { SceneBackdrop } from "@/components/interfaces/scenes/SceneBackdrop";
import { IntroSequence } from "@/components/interfaces/ui/IntroSequence";
import { PortfolioHeader } from "@/components/pages/layout/PortfolioHeader";
import { ChatWidget } from "@/components/pages/chat/ChatWidget";

export default function Home() {
  return (
    <IntroSequence><main className="relative flex h-[100svh] min-h-[36rem] flex-col overflow-hidden bg-ink-base text-text-on-dark sm:min-h-[42rem]">
      <SceneBackdrop scene="home" priority />
      <PortfolioHeader />
      <ChatWidget className="relative z-10 min-h-0 flex-1" />
    </main></IntroSequence>
  );
}
