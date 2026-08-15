import {
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/interfaces/ui/Badge";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ToolResultSurface } from "@/components/pages/chat/ToolResultSurface";
import type { FilterProjectsOutput } from "@/lib/tools/content/projects/project-filter-types";

interface ProjectFilterResultsProps {
  data: FilterProjectsOutput;
}

export function ProjectFilterResults({
  data,
}: ProjectFilterResultsProps) {
  return (
    <ToolResultSurface ariaLabel="Jordan's project results" label="PROJECT EVIDENCE" color="mustard" meta={`${data.count} ${data.count === 1 ? "result" : "results"}`}>
        <Typography
          as="p"
          variant="text"
          size="sm"
          className="opacity-70"
          aria-live="polite"
        >
          {data.message}
        </Typography>

        {data.projects.length === 0 ? (
          <div className="mt-5 border-l-4 border-l-mustard px-4 py-3">
            <Typography
              as="p"
              variant="text"
              size="sm"
            >
              No documented projects match
              these filters.
            </Typography>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {data.projects.map(
              (project) => (
                <article
                  key={project.id}
                  className="flex flex-col rounded-xl border border-current/10 bg-[var(--bg)]/55 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Typography
                        as="h3"
                        variant="header"
                        size="xl"
                      >
                        {project.title}
                      </Typography>

                      <Typography
                        as="p"
                        variant="text"
                        size="xs"
                        className="mt-1 opacity-60"
                      >
                        {project.category}
                        {" · "}
                        {project.status}
                      </Typography>
                    </div>

                    {project.featured ? (
                      <Badge color="coral">
                        FEATURED
                      </Badge>
                    ) : null}
                  </div>

                  <Typography
                    as="p"
                    variant="text"
                    size="sm"
                    className="mt-3 leading-6 opacity-75"
                  >
                    {
                      project.shortDescription
                    }
                  </Typography>

                  <Typography
                    as="p"
                    variant="text"
                    size="xs"
                    className="mt-3 opacity-60"
                  >
                    Role: {project.role}
                  </Typography>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags
                      .slice(0, 3)
                      .map((tag) => (
                        <Badge
                          key={tag}
                          color="pine"
                        >
                          {tag}
                        </Badge>
                      ))}
                  </div>

                  <div className="mt-auto pt-5">
                    <Button
                      href={`/projects/${project.slug}`}
                      variant="ghost"
                      aria-label={`View ${project.title} project details`}
                    >
                      View Project

                      <ArrowUpRightIcon
                        size={16}
                        className="ml-2"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </article>
              )
            )}
          </div>
        )}
    </ToolResultSurface>
  );
}
