import {
  PAGE_ROUTES,
  SECTION_IDS,
  type PageRoute,
  type ProjectId,
  type SectionId,
} from "@/lib/tools/types";
import { PROJECTS } from "@/lib/config/projects";

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

const PROJECT_DETAIL_COMMAND_PATTERN =
  /\b(?:open|view|visit|show|go to|move to|move me to|take me to|buka|lihat|kunjungi|tampilkan|pergi ke|pindah ke|arahkan(?: saya)? ke)\b/i;

function normalizeProjectName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getRequestedProject(userText: string) {
  const normalizedText = normalizeProjectName(userText);

  return PROJECTS.find((project) => {
    const names = [project.id, project.slug, project.title, ...(project.aliases ?? [])]
      .map(normalizeProjectName);

    return names.some((name) => normalizedText.includes(name));
  });
}

const PAGE_NAVIGATION_PATTERNS = [
  /\bopen\b/i,
  /\bgo to\b/i,
  /\bmove(?: me)? to\b/i,
  /\btake me to\b/i,
  /\bshow me\b/i,
  /\bback to\b/i,
  /\breturn to\b/i,
  /\bnavigate to\b/i,
  /\bbuka halaman\b/i,
  /\bpergi ke\b/i,
  /\bpindah ke\b/i,
  /\barahkan(?: saya)? ke\b/i,
  /\btampilkan\b/i,
  /\bkembali ke\b/i,
  /\bbalik ke\b/i,
];

export function getNavigationToolChoice(
  userText: string
) {
  const isHighlightCommand =
    HIGHLIGHT_COMMAND_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isHighlightCommand) {
    return {
      type: "tool",
      toolName: "highlightSection",
    } as const;
  }

  const isScrollCommand =
    SCROLL_COMMAND_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isScrollCommand) {
    return {
      type: "tool",
      toolName: "scrollToSection",
    } as const;
  }

  /*
   * Project detail harus lebih spesifik
   * daripada generic page navigation.
   */
  const isProjectDetailCommand =
    PROJECT_DETAIL_COMMAND_PATTERN.test(userText) &&
    getRequestedProject(userText) !== undefined;

  if (isProjectDetailCommand) {
    return {
      type: "tool",
      toolName: "openProjectDetail",
    } as const;
  }

  const isPageNavigationCommand =
    PAGE_NAVIGATION_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isPageNavigationCommand) {
    return {
      type: "tool",
      toolName: "navigateToPage",
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
  }
  | {
    kind: "scroll";
    sectionId: SectionId;
    message: string;
  }
  | {
    kind: "highlight";
    sectionId: SectionId;
    message: string;
  };

export function getDeterministicNavigationAction(
  userText: string
): DeterministicNavigationAction | null {
  const text = userText.trim();
  /*
   * Explicit section actions.
   *
   * Untuk sekarang kita harden target skills
   * yang memang sudah menjadi regression case.
   */
  if (
    /\b(?:highlight|spotlight|sorot|tandai)\b.*\bskills?\b/i.test(
      text
    ) ||
    /\b(?:sorot|tandai)\b.*\b(?:skill|keahlian|kemampuan)\b/i.test(
      text
    )
  ) {
    return {
      kind: "highlight",
      sectionId:
        SECTION_IDS.aboutSkills,
      message:
        "Opening and highlighting Jordan's skills…",
    };
  }

  if (
    /\b(?:scroll|jump to|scroll down to|scroll up to)\b.*\bskills?\b/i.test(
      text
    ) ||
    /\b(?:scroll ke|geser ke|gulir ke)\b.*\b(?:skill|skills|keahlian|kemampuan)\b/i.test(
      text
    )
  ) {
    return {
      kind: "scroll",
      sectionId:
        SECTION_IDS.aboutSkills,
      message:
        "Opening Jordan's skills…",
    };
  }
  /*
   * Specific project detail.
   */
  const requestedProject = getRequestedProject(text);

  if (PROJECT_DETAIL_COMMAND_PATTERN.test(text) && requestedProject) {
    return {
      kind: "project",
      projectId: requestedProject.id,
      message: `Opening ${requestedProject.title} project…`,
    };
  }

  /*
   * Portfolio pages.
   */
  if (
    /\b(?:go to|open|visit|navigate to|move(?: me)? to|take me to|show me|pergi ke|pindah ke|arahkan(?: saya)? ke|buka|tampilkan)\b.*\bprojects?\b/i.test(
      text
    )
  ) {
    return {
      kind: "route",
      route:
        PAGE_ROUTES.projects,
      message:
        "Opening Jordan's projects…",
    };
  }

  if (
    /\b(?:go to|open|visit|navigate to|move(?: me)? to|take me to|show me|pergi ke|pindah ke|arahkan(?: saya)? ke|buka|tampilkan)\b.*\babout\b/i.test(
      text
    ) ||
    /\b(?:pergi ke|pindah ke|arahkan(?: saya)? ke|buka|tampilkan)\b.*\b(?:tentang|profil)\b/i.test(
      text
    )
  ) {
    return {
      kind: "route",
      route:
        PAGE_ROUTES.about,
      message:
        "Opening Jordan's profile…",
    };
  }

  if (
    /\b(?:go to|open|visit|navigate to|move(?: me)? to|take me to|show me|pergi ke|pindah ke|arahkan(?: saya)? ke|buka|tampilkan)\b.*\bexperience\b/i.test(
      text
    ) ||
    /\b(?:pergi ke|pindah ke|arahkan(?: saya)? ke|buka|tampilkan)\b.*\bpengalaman\b/i.test(
      text
    )
  ) {
    return {
      kind: "route",
      route:
        PAGE_ROUTES.experience,
      message:
        "Opening Jordan's experience…",
    };
  }

  if (
    /\b(?:go to|open|visit|navigate to|move(?: me)? to|take me to|show me|pergi ke|pindah ke|arahkan(?: saya)? ke|buka|tampilkan)\b.*\bcontact\b/i.test(
      text
    ) ||
    /\b(?:pergi ke|pindah ke|arahkan(?: saya)? ke|buka|tampilkan)\b.*\bkontak\b/i.test(
      text
    )
  ) {
    return {
      kind: "route",
      route:
        PAGE_ROUTES.contact,
      message:
        "Opening Jordan's contact page…",
    };
  }

  if (
    /\b(?:go|back|return|move|take me)\b.*\bhome\b/i.test(
      text
    ) ||
    /\b(?:kembali|balik)\b.*\b(?:home|beranda)\b/i.test(
      text
    )
  ) {
    return {
      kind: "route",
      route:
        PAGE_ROUTES.home,
      message:
        "Going back to the home page…",
    };
  }

  return null;
}
