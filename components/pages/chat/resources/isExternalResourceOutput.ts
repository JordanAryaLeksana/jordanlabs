import type { ExternalResourceOutput } from "@/lib/tools/resources/resource-tool-outputs";
import { EXTERNAL_RESOURCE_HOSTNAME } from "@/lib/tools/resources/external-resource-allowlist";

export function isExternalResourceOutput(
  value: unknown
): value is ExternalResourceOutput {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    kind?: unknown;
    platform?: unknown;
    label?: unknown;
    url?: unknown;
    message?: unknown;
  };

  if (
    candidate.kind !== "external-resource" ||
    (
      candidate.platform !== "github" &&
      candidate.platform !== "linkedin"
    ) ||
    typeof candidate.label !== "string" ||
    candidate.label.trim() === "" ||
    typeof candidate.url !== "string" ||
    candidate.url.trim() === "" ||
    typeof candidate.message !== "string" ||
    candidate.message.trim() === ""
  ) {
    return false;
  }

  /*
   * Setelah guard di atas, TypeScript tahu:
   *
   * candidate.platform:
   *   "github" | "linkedin"
   *
   * candidate.url:
   *   string
   */

  try {
    const url =
      new URL(candidate.url);

    const expectedHostname =
      EXTERNAL_RESOURCE_HOSTNAME[
        candidate.platform
      ];

    return (
      url.protocol === "https:" &&
      url.hostname === expectedHostname &&
      url.username === "" &&
      url.password === "" &&
      url.port === ""
    );
  } catch {
    return false;
  }
}