import type { SectionId } from "@/lib/tools/types";

export interface PendingSectionAction {
  kind: "scroll" | "highlight";
  toolCallId: string;
  sectionId: SectionId;
}
