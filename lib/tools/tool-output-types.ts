export interface PortfolioToolOutputBase<
  TKind extends string
> {
  kind: TKind;
  confirmationText: string;
}

export interface CvDownloadCardData
  extends PortfolioToolOutputBase<"cv-download"> {
  ownerName: string;
  role: string;
  fileName: string;
  url: string;
}

export type PortfolioToolOutput =
  | CvDownloadCardData;