import "server-only";

import {
  ABOUT_PROFILE,
} from "@/lib/config/about";

import {
  EXPERIENCE,
} from "@/lib/config/experience";

import {
  PROJECTS,
} from "@/lib/config/projects";

import {
  SKILLS_BY_CATEGORY,
} from "@/lib/config/skills";

export function getEvaluationEvidence() {
  return {
    profile: {
      currentFocus:
        ABOUT_PROFILE.title,

      background:
        ABOUT_PROFILE.previousExperience,

      focusAreas: [
        ...ABOUT_PROFILE.focusAreas,
      ],
    },

    projects: PROJECTS.map(
      (project) => ({
        id: project.id,
        title: project.title,
        category:
          project.category,
        tags: [
          ...project.tags,
        ],
        status:
          project.status,
        role:
          project.role,
        isLive:
          /\blive\b/i.test(project.status),
        isInDevelopment:
          /not in production|in development/i.test(project.status),
        highlights: [
          ...(project.highlights ?? []),
        ],
        description:
          project.shortDescription,
        approach:
          project.overview.approach,
        contribution:
          project.overview
            .contribution,
        architecture:
          project.architecture,
      })
    ),

    skills: Object.entries(
      SKILLS_BY_CATEGORY
    ).map(
      ([
        category,
        group,
      ]) => ({
        category,
        label: group.label,
        items: [
          ...group.items,
        ] as string[],
      })
    ),

    experience:
      EXPERIENCE.map(
        (experience) => ({
          organization:
            experience.organization,

          shortName:
            experience.shortName,

          location:
            experience.location,

          roles:
            experience.roles.map(
              (role) => ({
                title:
                  role.title,

                period:
                  role.period,

                contributions: [
                  ...role.contributions,
                ] as string[],

                technologies: [
                  ...role.technologies,
                ] as string[],
              })
            ),
        })
      ),
  };
}
