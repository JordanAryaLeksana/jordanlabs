import type {
  PageRoute,
  ProjectId,
  ProjectSectionId,
  SectionId,
} from "@/lib/tools/types";

export interface NavigateToPageInput {
  route: PageRoute;
}

export interface ScrollToSectionInput {
  sectionId: SectionId;
}

export interface HighlightSectionInput {
  sectionId: SectionId;
}

export interface OpenProjectDetailInput {
  projectId: ProjectId;
  sectionId?: ProjectSectionId;
}
