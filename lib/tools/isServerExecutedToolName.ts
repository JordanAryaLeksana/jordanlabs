const SERVER_EXECUTED_TOOL_NAMES =
  new Set<string>([
    "showDownloadCard",
    "openGithub",
    "openLinkedin",
    "openUpwork",
    "showContactCard",
    "filterProjects",
    "filterSkills",
  ]);
export function isServerExecutedToolName(
  toolName: string
) {
  return SERVER_EXECUTED_TOOL_NAMES.has(
    toolName
  );
}
