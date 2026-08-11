const CV_COMMAND_PATTERNS = [
  /\b(?:get|show|open|view|download|see)\b.*\b(?:cv|resume|curriculum vitae)\b/i,

  /\b(?:can|could|may)\s+i\s+(?:see|view|get|have)\b.*\b(?:cv|resume|curriculum vitae)\b/i,

  /\b(?:cv|resume|curriculum vitae)\b.*\b(?:download|file|copy)\b/i,

  /\b(?:ambil|tampilkan|buka|lihat|download|unduh|minta)\b.*\b(?:cv|resume)\b/i,

  /\b(?:boleh|bisa)\b.*\b(?:lihat|minta|dapatkan)\b.*\b(?:cv|resume)\b/i,
];

const GITHUB_COMMAND_PATTERNS = [
  /\b(?:open|show|view|visit|see)\b.*\bgithub\b/i,

  /\b(?:go\s+to)\b.*\bgithub\b/i,

  /\bgithub\b.*\b(?:profile|page|account|jordan)\b/i,

  /\b(?:buka|tampilkan|lihat|kunjungi)\b.*\bgithub\b/i,
];
const LINKEDIN_COMMAND_PATTERNS = [
  /\b(?:open|show|view|visit|see)\b.*\blinkedin\b/i,

  /\b(?:go\s+to)\b.*\blinkedin\b/i,

  /\blinkedin\b.*\b(?:profile|page|account|jordan)\b/i,

  /\b(?:buka|tampilkan|lihat|kunjungi)\b.*\blinkedin\b/i,
];
const CONTACT_COMMAND_PATTERNS = [
  /\b(?:contact|email|reach)\s+jordan\b/i,
  /\bhow\s+(?:can|do)\s+i\s+(?:contact|email|reach)\s+jordan\b/i,
  /\b(?:hubungi|kontak|email)\s+jordan\b/i,
  /\bbagaimana\s+cara\s+menghubungi\s+jordan\b/i,
];
const HIRING_CONTACT_PATTERNS = [
  /*
   * English:
   * explicit intent to hire/recruit Jordan.
   */
  /\b(?:i want|i'd like|i would like)\s+to\s+(?:hire|recruit)\s+jordan\b/i,

  /\b(?:i'm interested|i am interested)\s+in\s+(?:hiring|recruiting)\s+jordan\b/i,

  /\b(?:i'm interested|i am interested)\s+to\s+(?:hire|recruit)\s+jordan\b/i,

  /*
   * Explicit contact for an opportunity.
   */
  /\b(?:i want|i'd like|i would like)\s+to\s+(?:contact|reach|email)\s+jordan\b.*\b(?:job|role|position|opportunity|hiring|recruitment)\b/i,

  /\b(?:contact|reach|email)\s+jordan\b.*\b(?:about|for|regarding)\b.*\b(?:job|role|position|opportunity|hiring|recruitment)\b/i,

  /*
   * Indonesian:
   * explicit hiring intent.
   */
  /\b(?:saya ingin|saya mau)\s+(?:untuk\s+)?(?:merekrut|rekrut|hire)\s+jordan\b/i,

  /\b(?:saya tertarik)\s+(?:untuk\s+)?(?:merekrut|rekrut|hire)\s+jordan\b/i,

  /*
   * Explicit contact for a job opportunity.
   */
  /\b(?:saya ingin|saya mau)\s+(?:menghubungi|kontak|email)\s+jordan\b.*\b(?:pekerjaan|posisi|lowongan|kesempatan|rekrutmen)\b/i,
];
export function getResourceToolChoice(
  userText: string
) {
  const isCvCommand =
    CV_COMMAND_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isCvCommand) {
    return {
      type: "tool",
      toolName: "showDownloadCard",
    } as const;
  }

  const isGithubCommand =
    GITHUB_COMMAND_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isGithubCommand) {
    return {
      type: "tool",
      toolName: "openGithub",
    } as const;
  }

  const isLinkedinCommand =
    LINKEDIN_COMMAND_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isLinkedinCommand) {
    return {
      type: "tool",
      toolName: "openLinkedin",
    } as const;
  }
  const isContactCommand =
    CONTACT_COMMAND_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    ) ||
    HIRING_CONTACT_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isContactCommand) {
    return { type: "tool", toolName: "showContactCard" } as const;
  }
  return null;
}
