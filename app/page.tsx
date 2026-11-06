import { SceneBackdrop } from "@/components/interfaces/scenes/SceneBackdrop";
import { IntroSequence } from "@/components/interfaces/ui/IntroSequence";
import { PortfolioHeader } from "@/components/pages/layout/PortfolioHeader";
import { ChatWidget } from "@/components/pages/chat/ChatWidget";
import { INTRO_SEEN_BOOTSTRAP_SCRIPT } from "@/lib/intro/introSession";

export default function Home() {
  return (
    <>
      {/* Runs before first paint: hides the intro for visitors who already watched it this session. */}
      <script dangerouslySetInnerHTML={{ __html: INTRO_SEEN_BOOTSTRAP_SCRIPT }} />
      <IntroSequence><main className="relative flex min-h-[100svh] flex-col overflow-x-clip bg-ink-base text-text-on-dark">
        <SceneBackdrop scene="home" />
        <PortfolioHeader />
        <ChatWidget className="relative z-10 min-h-0 flex-1" />
      </main></IntroSequence>
    </>
  );
}
