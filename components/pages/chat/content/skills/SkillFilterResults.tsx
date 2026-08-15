import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ToolResultSurface } from "@/components/pages/chat/ToolResultSurface";

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
    <ToolResultSurface ariaLabel="Jordan's skill results" label="SKILL EVIDENCE" color="coral" meta={`${data.count} ${data.count === 1 ? "skill" : "skills"}`}>
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
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {data.groups.map(
              (group) => (
                <article
                  key={group.category}
                  className="rounded-xl border border-current/10 bg-[var(--bg)]/55 p-5"
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
    </ToolResultSurface>
  );
}
