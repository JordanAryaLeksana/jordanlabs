import "server-only";

import { createNavigationTools } from "@/lib/tools/navigation";
import { createResourceTools } from "@/lib/tools/resources";
import {
  createProjectContentTools,
  createSkillContentTools,
} from "@/lib/tools/content";

export function createPortfolioTools() {
  return {
    ...createNavigationTools(),
    ...createResourceTools(),
    ...createProjectContentTools(),
    ...createSkillContentTools(),
  };
}
