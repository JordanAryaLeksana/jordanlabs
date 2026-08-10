import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

import type {
  FilterSkillsOutput,
} from "@/lib/tools/content/skills/skill-filter-types";

interface SkillFilterResultsProps {
  data: FilterSkillsOutput;
}

export function SkillFilterResults({
  data,
}: SkillFilterResultsProps) {
  return (
    <section
      aria-label="Jordan's skill results"
      className="w-full max-w-2xl border border-current/25 bg-[var(--bg-raised)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/15 px-5 py-4">
        <Badge color="coral">
          SKILLS
        </Badge>

        <Typography
          as="p"
          variant="text"
          size="xs"
          weight="bold"
          className="uppercase tracking-[0.12em] opacity-60"
        >
          {data.count}{" "}
          {data.count === 1
            ? "skill"
            : "skills"}
        </Typography>
      </div>

      <div className="p-5">
        <Typography
          as="p"
          variant="text"
          size="sm"
          className="opacity-70"
        >
          {data.message}
        </Typography>

        {data.groups.length === 0 ? (
          <div className="mt-5 border-l-4 border-l-mustard px-4 py-3">
            <Typography
              as="p"
              variant="text"
              size="sm"
            >
              No documented skills
              match this filter.
            </Typography>
          </div>
        ) : (
          <div className="mt-5 flex flex-col border-t border-current/15">
            {data.groups.map(
              (group) => (
                <article
                  key={group.category}
                  className="border-b border-current/15 py-5 last:border-b-0"
                >
                  <Typography
                    as="h3"
                    variant="header"
                    size="xl"
                  >
                    {group.label}
                  </Typography>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.skills.map(
                      (skill) => (
                        <Badge
                          key={skill}
                          color={
                            group.category ===
                            "ai"
                              ? "coral"
                              : "pine"
                          }
                        >
                          {skill}
                        </Badge>
                      )
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}