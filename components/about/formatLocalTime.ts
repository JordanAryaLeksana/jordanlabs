import { ABOUT_PROFILE } from "@/lib/config/about";

export function formatLocalTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: ABOUT_PROFILE.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}
