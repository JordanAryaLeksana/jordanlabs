import { isNavigateToPageInput } from "@/lib/tools/navigation/isNavigateToPageInput";
import type { NavigateToPageOutput } from "@/lib/tools/navigation/navigation-tool-outputs";
import type { PageRoute } from "@/lib/tools/types";

interface ExecuteNavigateToPageOptions {
    input: unknown;
    navigate: (route: PageRoute) => void;
}

export function executeNavigateToPage({
    input,
    navigate,
}: ExecuteNavigateToPageOptions): NavigateToPageOutput {
    if (!isNavigateToPageInput(input)) {
        return {
            status: "error",
            message: "Invalid input for navigation.",
        };
    }
    navigate(input.route);

    return {
        status: "success",
        route: input.route,
        message:
            "The requested portfolio page was opened.",
    };
}