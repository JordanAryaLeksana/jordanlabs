import type { PageRoute } from "../types";

export interface NavigateToPageOutput {
    status: "success" | "error";
    route?: PageRoute;
    message: string;
}

export interface ScrollToSectionOutput {
    status: "success" | "error";
    sectionId?: string;
    message: string;
}

export interface HighlightSectionOutput {
    status: "success" | "error";
    sectionId?: string;
    message: string;
}

export interface OpenProjectDetailOutput {
    status: "success" | "error";
    projectId?: string;
    sectionId?: string;
    target?: string;
    message: string;
}