import "server-only";

import { getCvResource } from "@/lib/tools/portfolio-data";
import type { ShowDownloadCardOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function getShowDownloadCardOutput(): ShowDownloadCardOutput {
  const cv = getCvResource();

  return {
    kind: "cv-download",
    ownerName: cv.ownerName,
    role: cv.role,
    fileName: cv.fileName,
    url: cv.url,
    message: "Jordan's CV is ready.",
  };
}
