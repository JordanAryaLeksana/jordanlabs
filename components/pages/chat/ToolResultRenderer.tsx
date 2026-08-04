import type { ReactElement } from "react";
import { CvDownloadCard } from "./tool-cards/CVDownloadCard";
import type { PortfolioToolOutput } from "@/lib/tools/tool-output-types";

interface ToolResultRendererProps {
  output: PortfolioToolOutput;
}

export function ToolResultRenderer({
  output,
}: ToolResultRendererProps): ReactElement {
  switch (output.kind) {
    case "cv-download":
      return <CvDownloadCard data={output} />;
  }

}