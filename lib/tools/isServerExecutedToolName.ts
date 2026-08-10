const SERVER_EXECUTED_TOOL_NAMES =
  new Set<string>([
    "showDownloadCard",
    "openGithub",
    "openLinkedin",
    "showContactCard",
    "filterProjects",
  ]);
export function isServerExecutedToolName(
  toolName: string
) {
  return SERVER_EXECUTED_TOOL_NAMES.has(
    toolName
  );
}
