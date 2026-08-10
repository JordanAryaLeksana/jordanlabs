export interface ShowDownloadCardOutput {
  kind: "cv-download";
  ownerName: string;
  role: string;
  fileName: string;
  url: string;
  message: string;
}

export interface ExternalResourceOutput {
  kind: "external-resource";

  platform:
    | "github"
    | "linkedin";

  label: string;
  url: string;
  message: string;
}

export interface ContactCardOutput {
  kind: "contact-card";
  ownerName: string;
  role: string;
  emailAddress: string;
  mailtoUrl: string;
  message: string;
}
