import { ABOUT_PROFILE } from "@/lib/config/about";
import { PROFILE } from "@/lib/config/profile";
import { CV_FILE_NAME, CV_URL, EMAIL_ADDRESS, EMAIL_MAILTO_URL, GITHUB_URL, LINKEDIN_URL, UPWORK_URL, INSTAGRAM_URL, TIKTOK_URL, DISCORD_URL, DISCORD_USERNAME } from "@/lib/config/links";

export const CONTACT_PROFILE = {
  name: PROFILE.fullName,
  focus: PROFILE.headline,
  email: EMAIL_ADDRESS,
  emailUrl: EMAIL_MAILTO_URL,
  location: `${ABOUT_PROFILE.location} (${PROFILE.timezoneLabel})`,
  responseNote: "Open to full-time Software / Backend Engineer and AI Engineer roles, freelance projects through Upwork, and remote or international teams.",
} as const;

export const CONTACT_CHANNELS = {
  github: { label: "GitHub", handle: "JordanAryaLeksana", url: GITHUB_URL },
  linkedin: { label: "LinkedIn", handle: "jordanaryaleksana", url: LINKEDIN_URL },
  upwork: { label: "Upwork", handle: "Hire Jordan on Upwork", url: UPWORK_URL },
  cv: { label: "CV", handle: CV_FILE_NAME, url: CV_URL },
  instagram: { label: "Instagram", handle: "Not configured", url: INSTAGRAM_URL },
  tiktok: { label: "TikTok", handle: "Not configured", url: TIKTOK_URL },
  discord: { label: "Discord", handle: DISCORD_USERNAME || "Not configured", url: DISCORD_URL },
} as const;
