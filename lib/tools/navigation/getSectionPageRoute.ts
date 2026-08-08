import {
  PAGE_ROUTES,
  SECTION_IDS,
  type PageRoute,
  type SectionId,
} from "@/lib/tools/types";

const SECTION_PAGE_ROUTES:
  Partial<Record<SectionId, PageRoute>> = {
    [SECTION_IDS.aboutBackground]:
      PAGE_ROUTES.about,

    [SECTION_IDS.aboutSkills]:
      PAGE_ROUTES.about,

    [SECTION_IDS.aboutExperience]:
      PAGE_ROUTES.about,

    [SECTION_IDS.projectsFeatured]:
      PAGE_ROUTES.projects,

    [SECTION_IDS.projectsAll]:
      PAGE_ROUTES.projects,

    [SECTION_IDS.experienceList]:
      PAGE_ROUTES.experience,

    [SECTION_IDS.contactForm]:
      PAGE_ROUTES.contact,
  };

export function getSectionPageRoute(
  sectionId: SectionId
): PageRoute | null {
  return (
    SECTION_PAGE_ROUTES[sectionId] ??
    null
  );
}
