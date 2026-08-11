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

      previousExperience:
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
        description:
          project.shortDescription,
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
        ],
      })
    ),

    experience:
      EXPERIENCE.map(
        (experience) => ({
          organization:
            experience.organization,

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
                ],

                technologies: [
                  ...role.technologies,
                ],
              })
            ),
        })
      ),
  };
}
