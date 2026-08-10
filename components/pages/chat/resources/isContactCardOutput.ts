import type { ContactCardOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function isContactCardOutput(
  value: unknown
): value is ContactCardOutput {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    kind?: unknown;
    ownerName?: unknown;
    role?: unknown;
    emailAddress?: unknown;
    mailtoUrl?: unknown;
    message?: unknown;
  };

  if (
    candidate.kind !== "contact-card" ||
    typeof candidate.ownerName !== "string" ||
    candidate.ownerName.trim() === "" ||
    typeof candidate.role !== "string" ||
    candidate.role.trim() === "" ||
    typeof candidate.emailAddress !== "string" ||
    candidate.emailAddress.trim() === "" ||
    typeof candidate.mailtoUrl !== "string" ||
    candidate.mailtoUrl.trim() === "" ||
    typeof candidate.message !== "string" ||
    candidate.message.trim() === ""
  ) {
    return false;
  }

  /*
   * Mulai titik ini TypeScript sudah tahu:
   *
   * candidate.emailAddress: string
   * candidate.mailtoUrl: string
   */
  try {
    const mailto =
      new URL(candidate.mailtoUrl);

    if (
      mailto.protocol !== "mailto:"
    ) {
      return false;
    }

    const recipient =
      decodeURIComponent(
        mailto.pathname
      )
        .trim()
        .toLowerCase();

    const expectedEmail =
      candidate.emailAddress
        .trim()
        .toLowerCase();

    return (
      recipient === expectedEmail
    );
  } catch {
    return false;
  }
}