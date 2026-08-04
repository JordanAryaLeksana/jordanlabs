import "server-only";

import { CV_URL } from "@/lib/config/links";
import { PROFILE } from "@/lib/config/profile";
import type { CvDownloadCardData } from "@/lib/tools/tool-output-types";

type CvDownloadResourceData = Omit<
  CvDownloadCardData,
  "confirmationText"
>;

export function getCvDownloadCardData(): CvDownloadResourceData {
  return {
    kind: "cv-download",
    ownerName: PROFILE.fullName,
    role: PROFILE.role,
    fileName: "Jordan Arya Leksana_CV2026.pdf",
    url: CV_URL,
  };
}