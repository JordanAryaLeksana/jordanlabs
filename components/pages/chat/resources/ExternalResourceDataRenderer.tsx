import { ExternalResourceResult } from "@/components/pages/chat/resources/ExternalResourceResult";
import type { ExternalResourceDataPart } from "@/components/pages/chat/resources/isExternalResourceDataPart";

interface ExternalResourceDataRendererProps {
  part: ExternalResourceDataPart;
}

export function ExternalResourceDataRenderer({
  part,
}: ExternalResourceDataRendererProps) {
  return (
    <ExternalResourceResult
      value={part.data}
    />
  );
}
