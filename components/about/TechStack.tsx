"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Badge } from "@/components/ui/Badge";
import { Pill } from "@/components/ui/Pill";
import { Typography } from "@/components/ui/Typography/Typography";
import { ABOUT_TECH_STACK } from "@/lib/config/about";

type StackId = (typeof ABOUT_TECH_STACK)[number]["id"];

export function TechStack() {
  const [activeStack, setActiveStack] = useState<StackId>("ai");
  const selectedStack = ABOUT_TECH_STACK.find((stack) => stack.id === activeStack) ?? ABOUT_TECH_STACK[0];

  return (
    <Section className="py-8" disableReveal>
      <div className="grid gap-5 border-y border-current/15 py-7 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">TECH STACK</Typography><Typography as="h2" variant="header" size="2xl" className="mt-1">Tools I build with</Typography></div>
        <div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Technology categories">
            {ABOUT_TECH_STACK.map((stack) => <Pill key={stack.id} type="button" active={stack.id === activeStack} role="tab" aria-selected={stack.id === activeStack} onClick={() => setActiveStack(stack.id)}>{stack.label}</Pill>)}
          </div>
          <StaggerContainer key={selectedStack.id} className="mt-4 flex flex-wrap gap-2" trigger="mount">
            {selectedStack.items.map((item) => <StaggerItem key={item}><Badge color={selectedStack.id === "ai" ? "coral" : "pine"}>{item}</Badge></StaggerItem>)}
          </StaggerContainer>
        </div>
      </div>
    </Section>
  );
}
