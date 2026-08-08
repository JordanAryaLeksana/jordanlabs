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
