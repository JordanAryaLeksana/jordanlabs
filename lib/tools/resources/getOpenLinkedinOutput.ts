import "server-only"

import { getLinkedinResource } from "@/lib/tools/portfolio-data";
import type { ExternalResourceOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function getOpenLinkedinOutput(): ExternalResourceOutput {
    const linkedin = getLinkedinResource();

    return {
        kind: "external-resource",
        platform: "linkedin",
        label: linkedin.label,
        url: linkedin.url,
        message: "Jordan's LinkedIn profile is ready.",
    };
}