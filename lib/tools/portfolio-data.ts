import "server-only";

import {
  CV_FILE_NAME,
  CV_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  EMAIL_ADDRESS,
  EMAIL_MAILTO_URL,
} from "@/lib/config/links";
import { PROFILE } from "@/lib/config/profile";

export interface CvResource {
  ownerName: string;
  role: string;
  fileName: string;
  url: string;
}

export interface ContactResource {
  ownerName: string;
  role: string;
  emailAddress: string;
  mailtoUrl: string;
}

export function getContactResource(): ContactResource {
  return {
    ownerName: PROFILE.fullName,
    role: PROFILE.role,
    emailAddress: EMAIL_ADDRESS,
    mailtoUrl: EMAIL_MAILTO_URL,
  };
}

export function getCvResource(): CvResource {
  return {
    ownerName: PROFILE.fullName,
    role: PROFILE.role,
    fileName: CV_FILE_NAME,
    url: CV_URL,
  };
}

export interface ExternalResource {
  label: string;
  url: string;
}

export function getGithubResource(): ExternalResource {
  return {
    label: "Jordan Arya Leksana on GitHub",
    url: GITHUB_URL,
  };
}

export function getLinkedinResource(): ExternalResource {
  return {
    label: "Jordan Arya Leksana on LinkedIn",
    url: LINKEDIN_URL,
  };
}
