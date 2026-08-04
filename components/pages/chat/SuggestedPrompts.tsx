"use client";

import { StaggerContainer } from "@/components/interfaces/motion/StaggerContainer";
import { StaggerItem } from "@/components/interfaces/motion/StaggerItem";
import { Pill } from "@/components/interfaces/ui/Pill";

const SUGGESTED_PROMPTS = [
  "What projects have you built?",
  "What are your skills?",
  "Can I see your CV?",
  "How do I get in touch?",
] as const;

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}


export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <StaggerContainer className="flex flex-wrap gap-2">
      {SUGGESTED_PROMPTS.map((prompt) => (
        <StaggerItem key={prompt}>
          <Pill onClick={() => onSelect(prompt)}>{prompt}</Pill>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
