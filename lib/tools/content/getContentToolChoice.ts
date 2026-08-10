const PROJECT_FILTER_PATTERNS = [
  /*
   * English explicit listing/filter commands.
   */
  /\b(?:show|list|find|filter)\b.*\bprojects?\b/i,

  /\b(?:show|list|find|filter)\b.*\b(?:featured|ai|computer vision|deep learning|research)\b.*\bprojects?\b/i,

  /\bwhich\s+projects?\b.*\bfeatured\b/i,

  /\bwhat\s+projects?\b.*\bjordan\b/i,

  /*
   * Indonesian explicit listing/filter commands.
   */
  /\b(?:tampilkan|tunjukkan|daftar|cari|filter|saring)\b.*\b(?:project|projects|proyek)\b/i,

  /\b(?:tampilkan|tunjukkan|daftar|cari|filter|saring)\b.*\b(?:ai|unggulan|featured|computer vision|deep learning|research|riset)\b.*\b(?:project|projects|proyek)\b/i,
];

const GENERIC_PROJECT_LIST_PATTERNS = [
  /^\s*(?:view|show|list|browse)\s+(?:jordan'?s\s+)?projects?\s*[.!?]*$/i,

  /^\s*(?:lihat|tampilkan|daftar)\s+(?:project|projects|proyek)(?:\s+jordan)?\s*[.!?]*$/i,
  /^\s*(?:tell me about|show me|show|list|view)\s+jordan(?:'s)?\s+projects?\s*[.!?]*$/i,
];
const SKILL_FILTER_PATTERNS = [
  /*
   * English explicit listing.
   */
  /\b(?:show|list|find|filter|display)\b.*\bskills?\b/i,

  /\b(?:show|list|find|filter|display)\b.*\b(?:frontend|backend|programming|database|ai|machine learning|deep learning|computer vision|tooling|collaboration)\b.*\bskills?\b/i,

  /*
   * Natural English questions.
   */
  /\bwhat\b.*\bskills?\b.*\bjordan\b/i,

  /\bwhat\b.*\b(?:tools|tooling|technologies)\b.*\bjordan\b.*\buse/i,

  /*
   * Indonesian explicit listing.
   */
  /\b(?:tampilkan|tunjukkan|lihat|daftar|cari|filter|saring|sebutkan)\b.*\b(?:skill|skills|kemampuan|keahlian|keterampilan)\b/i,

  /*
   * Indonesian natural questions.
   */
  /\b(?:apa saja|apa aja|apa yang)\b.*\b(?:skill|skills|kemampuan|keahlian|keterampilan)\b.*\bjordan\b/i,

  /\b(?:skill|skills|kemampuan|keahlian|keterampilan)\b.*\bjordan\b.*\b(?:apa saja|apa aja|apa)\b/i,

  /\b(?:tools|tooling|teknologi)\b.*\b(?:apa saja|apa aja|apa)\b.*\bjordan\b/i,
];
const SKILL_REASONING_PATTERNS = [
  /\b(?:suitable|fit|qualified|relevant|strongest|best|compare|evaluate|assess)\b/i,

  /\b(?:cocok|sesuai|layak|pantas|relevan|terkuat|terbaik|bandingkan|evaluasi|nilai)\b/i,
];

function normalizeContentText(
  text: string
) {
  return text
    .toLowerCase()
    .trim()

    /*
     * Common Indonesian informal wording.
     */
    .replace(/\btampilin\b/g, "tampilkan")
    .replace(/\btunjukin\b/g, "tunjukkan")
    .replace(/\bapa aja\b/g, "apa saja")

    /*
     * Conservative common typo normalization.
     */
    .replace(/\bskil\b/g, "skill")
    .replace(/\bskiil\b/g, "skill")
    .replace(/\bprojek\b/g, "proyek");
}

export function getContentToolChoice(
  userText: string
) {
  const normalizedText =
    normalizeContentText(
      userText
    );
  const shouldShowAllProjects =
    GENERIC_PROJECT_LIST_PATTERNS.some(
      (pattern) =>
        pattern.test(normalizedText)
    );

  const shouldFilterProjects =
    PROJECT_FILTER_PATTERNS.some(
      (pattern) =>
        pattern.test(normalizedText)
    );

  if (
    shouldShowAllProjects ||
    shouldFilterProjects
  ) {
    return {
      type: "tool",
      toolName: "filterProjects",
    } as const;
  }
  const isSkillReasoningRequest =
    SKILL_REASONING_PATTERNS.some(
      (pattern) =>
        pattern.test(normalizedText)
    );

  const shouldFilterSkills =
    !isSkillReasoningRequest &&
    SKILL_FILTER_PATTERNS.some(
      (pattern) =>
        pattern.test(normalizedText)
    );

  if (shouldFilterSkills) {
    return {
      type: "tool",
      toolName: "filterSkills",
    } as const;
  }

  return null;
}