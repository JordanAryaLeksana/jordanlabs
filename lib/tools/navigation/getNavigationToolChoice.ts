const HIGHLIGHT_COMMAND_PATTERNS = [
  /\bhighlight\b/i,
  /\bspotlight\b/i,
  /\bsorot\b/i,
  /\btandai\b/i,
  /\bberi penanda\b/i,
];

const SCROLL_COMMAND_PATTERNS = [
  /\bscroll\b/i,
  /\bjump to\b/i,
  /\bscroll down to\b/i,
  /\bscroll up to\b/i,
  /\bgeser ke\b/i,
  /\bgulir ke\b/i,
  /\bscroll ke\b/i,
];
const PROJECT_DETAIL_COMMAND_PATTERNS = [
  /\b(?:open|view|visit|show|go to)\b.*\b(?:emqnet|dermsight)\b/i,
  /\b(?:buka|lihat|kunjungi|tampilkan|pergi ke)\b.*\b(?:emqnet|dermsight)\b/i,
];

const PAGE_NAVIGATION_PATTERNS = [
  /\bopen\b/i,
  /\bgo to\b/i,
  /\bback to\b/i,
  /\breturn to\b/i,
  /\bnavigate to\b/i,
  /\bbuka halaman\b/i,
  /\bpergi ke\b/i,
  /\bkembali ke\b/i,
  /\bbalik ke\b/i,
];
import {
  PAGE_ROUTES,
  PROJECT_IDS,
  type PageRoute,
  type ProjectId,
} from "@/lib/tools/types";
export function getNavigationToolChoice(
  userText: string
) {
  const isHighlightCommand =
    HIGHLIGHT_COMMAND_PATTERNS.some(
      (pattern) => {
        return pattern.test(userText);
      }
    );

  if (isHighlightCommand) {
    return {
      type: "tool",
      toolName: "highlightSection",
    } as const;
  }

  const isScrollCommand =
    SCROLL_COMMAND_PATTERNS.some(
      (pattern) => {
        return pattern.test(userText);
      }
    );

  if (isScrollCommand) {
    return {
      type: "tool",
      toolName: "scrollToSection",
    } as const;
  }

  const isPageNavigationCommand =
    PAGE_NAVIGATION_PATTERNS.some(
      (pattern) => {
        return pattern.test(userText);
      }
    );

  if (isPageNavigationCommand) {
    return {
      type: "tool",
      toolName: "navigateToPage",
    } as const;
  }
  const isProjectDetailCommand =
    PROJECT_DETAIL_COMMAND_PATTERNS.some(
      (pattern) => {
        return pattern.test(userText);
      }
    );

  if (isProjectDetailCommand) {
    return {
      type: "tool",
      toolName: "openProjectDetail",
    } as const;
  }
  return "auto" as const;
}
export type DeterministicNavigationAction =
  | {
    kind: "route";
    route: PageRoute;
    message: string;
  }
  | {
    kind: "project";
    projectId: ProjectId;
    message: string;
  };

export function getDeterministicNavigationAction(
  userText: string
): DeterministicNavigationAction | null {
  const text = userText.trim();

  /*
   * Project detail harus diperiksa
   * sebelum generic page navigation.
   */
  if (
    /\b(?:open|view|visit|show|go to|buka|lihat|kunjungi|tampilkan)\b.*\bemqnet\b/i.test(
      text
    )
  ) {
    return {
      kind: "project",
      projectId: PROJECT_IDS.emqnet,
      message: "Opening EMQNET project…",
    };
  }

  if (
    /\b(?:open|view|visit|show|go to|buka|lihat|kunjungi|tampilkan)\b.*\bdermsight\b/i.test(
      text
    )
  ) {
    return {
      kind: "project",
      projectId: PROJECT_IDS.dermsight,
      message: "Opening DermSight project…",
    };
  }

  if (
    /\b(?:go to|open|visit|navigate to|pergi ke|buka)\b.*\bprojects?\b/i.test(
      text
    )
  ) {
    return {
      kind: "project",
      projectId: PROJECT_IDS.dermsight,
      message: "Opening DermSight project…",
    };
  }

  if (
    /\b(?:go|back|return)\b.*\bhome\b/i.test(
      text
    ) ||
    /\b(?:kembali|balik)\b.*\b(?:home|beranda)\b/i.test(
      text
    )
  ) {
    return {
      kind: "route",
      route: PAGE_ROUTES.home,
      message: "Going back to the home page…",
    };
  }

  return null;
}