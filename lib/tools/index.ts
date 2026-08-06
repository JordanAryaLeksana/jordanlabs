import "server-only"

import { createNavigationTools } from "./navigation-tools/navigation-tools"

export function createPortofolioTools() {
    return{
        ...createNavigationTools(),
    }
}