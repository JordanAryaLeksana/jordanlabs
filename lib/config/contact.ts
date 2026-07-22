import { ABOUT_PROFILE } from "@/lib/config/about";
import { EMAIL_ADDRESS, EMAIL_MAILTO_URL, GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL, TIKTOK_URL, DISCORD_URL, DISCORD_USERNAME } from "@/lib/config/links";

export const CONTACT_PROFILE = {
  name: "Jordan Arya Leksana",
  focus: "AI Engineering Focus",
  email: EMAIL_ADDRESS,
  emailUrl: EMAIL_MAILTO_URL,
  location: ABOUT_PROFILE.location,
  responseNote: "Open to thoughtful AI engineering, software, and collaboration conversations.",
} as const;

export const CONTACT_CHANNELS = {
  github: { label: "GitHub", handle: "JordanAryaLeksana", url: GITHUB_URL },
  linkedin: { label: "LinkedIn", handle: "jordanaryaleksana", url: LINKEDIN_URL },
  instagram: { label: "Instagram", handle: "Not configured", url: INSTAGRAM_URL },
  tiktok: { label: "TikTok", handle: "Not configured", url: TIKTOK_URL },
  discord: { label: "Discord", handle: DISCORD_USERNAME || "Not configured", url: DISCORD_URL },
} as const;
