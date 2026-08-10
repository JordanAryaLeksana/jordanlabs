import {
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/interfaces/ui/Badge";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { FilterProjectsOutput } from "@/lib/tools/content/projects/project-filter-types";

interface ProjectFilterResultsProps {
  data: FilterProjectsOutput;
}

export function ProjectFilterResults({
  data,
}: ProjectFilterResultsProps) {
  return (
    <section
      aria-label="Jordan's project results"
      className="w-full max-w-2xl border border-current/25 bg-[var(--bg-raised)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/15 px-5 py-4">
        <Badge color="mustard">
          PROJECTS
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
            ? "result"
            : "results"}
        </Typography>
      </div>

      <div className="p-5">
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
          <div className="mt-5 flex flex-col border-t border-current/15">
            {data.projects.map(
              (project) => (
                <article
                  key={project.id}
                  className="border-b border-current/15 py-5 last:border-b-0"
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

                  <div className="mt-4">
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
      </div>
    </section>
  );
}
