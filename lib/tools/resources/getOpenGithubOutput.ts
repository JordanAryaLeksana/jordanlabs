import "server-only";

import { getGithubResource } from "@/lib/tools/portfolio-data";
import type { ExternalResourceOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function getOpenGithubOutput(): ExternalResourceOutput {
  const github =
    getGithubResource();

  return {
    kind: "external-resource",
    platform: "github",
    label: github.label,
    url: github.url,
    message:
      "Jordan's GitHub profile is ready.",
  };
}
