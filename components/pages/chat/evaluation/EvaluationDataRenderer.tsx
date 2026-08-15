import { CheckCircleIcon, InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { ToolResultSurface } from "@/components/pages/chat/ToolResultSurface";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { EvaluationResultDataPart } from "@/components/pages/chat/evaluation/isEvaluationDataPart";

const LABELS = { strong: "Strong evidence", moderate: "Moderate evidence", limited: "Limited evidence" } as const;

export function EvaluationDataRenderer({ part }: { part: EvaluationResultDataPart }) {
  const { assessment, summary, strengths, limitations } = part.data;
  return <ToolResultSurface ariaLabel="Jordan role evaluation" label="ROLE EVALUATION" color={assessment === "strong" ? "pine" : assessment === "moderate" ? "mustard" : "coral"} meta={LABELS[assessment].toUpperCase()}><Typography as="p" variant="text" className="max-w-2xl text-base leading-7">{summary}</Typography><div className="mt-6 grid gap-6 sm:grid-cols-2">{strengths.length > 0 ? <section><h3 className="flex items-center gap-2 font-display text-base font-bold"><CheckCircleIcon size={18} className="text-frame-green" />Documented evidence</h3><ul className="mt-3 space-y-2">{strengths.map((item, index) => <li key={`strength-${index}`} className="flex gap-2 text-sm leading-6 opacity-75"><span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-pine" />{item}</li>)}</ul></section> : null}{limitations.length > 0 ? <section><h3 className="flex items-center gap-2 font-display text-base font-bold"><InfoIcon size={18} className="text-mustard" />Limitations</h3><ul className="mt-3 space-y-2">{limitations.map((item, index) => <li key={`limitation-${index}`} className="flex gap-2 text-sm leading-6 opacity-75"><span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mustard" />{item}</li>)}</ul></section> : null}</div></ToolResultSurface>;
}
