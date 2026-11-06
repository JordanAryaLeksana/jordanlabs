import "server-only";

import { getUpworkResource } from "@/lib/tools/portfolio-data";
import type { ExternalResourceOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function getOpenUpworkOutput(): ExternalResourceOutput {
  const upwork = getUpworkResource();

  return {
    kind: "external-resource",
    platform: "upwork",
    label: upwork.label,
    url: upwork.url,
    message: "Jordan's Upwork profile is ready. He is open to freelance projects.",
  };
}
