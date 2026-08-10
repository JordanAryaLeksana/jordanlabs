import type { ExternalResourceOutput } from "@/lib/tools/resources/resource-tool-outputs";

type ExternalPlatform =
  ExternalResourceOutput["platform"];

export const EXTERNAL_RESOURCE_HOSTNAME: Record<
  ExternalPlatform,
  string
> = {
  github: "github.com",
  linkedin: "www.linkedin.com",
};
