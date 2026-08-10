import "server-only";

import { getContactResource } from "@/lib/tools/portfolio-data";
import type { ContactCardOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function getShowContactCardOutput(): ContactCardOutput {
  const contact = getContactResource();

  return {
    kind: "contact-card",
    ...contact,
    message: "Jordan's verified email contact is ready.",
  };
}
