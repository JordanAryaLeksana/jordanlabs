const SCROLL_COMMAND_PATTERNS = [
  /\bscroll\b/i,
  /\bjump to\b/i,
  /\bscroll down to\b/i,
  /\bscroll up to\b/i,
  /\bgeser ke\b/i,
  /\bgulir ke\b/i,
  /\bscroll ke\b/i,
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
  const isScrollCommand =
    SCROLL_COMMAND_PATTERNS.some((pattern) => {
      return pattern.test(userText);
    });

  if (isScrollCommand) {
    return {
      type: "tool",
      toolName: "scrollToSection",
    } as const;
  }

  const isPageNavigationCommand =
    PAGE_NAVIGATION_PATTERNS.some((pattern) => {
      return pattern.test(userText);
    });

  if (isPageNavigationCommand) {
    return {
      type: "tool",
      toolName: "navigateToPage",
    } as const;
  }

  return "auto" as const;
}
