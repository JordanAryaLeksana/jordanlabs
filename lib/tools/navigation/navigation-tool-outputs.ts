import type { PageRoute } from "../types";

export interface NavigateToPageOutput {
    status: "success" | "error";
    route?: PageRoute;
    message: string;
}