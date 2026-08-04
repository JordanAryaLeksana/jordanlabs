import { EMAIL_MAILTO_URL } from "@/lib/config/links";

export function buildContactMailto(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  return `${EMAIL_MAILTO_URL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)}`;
}
