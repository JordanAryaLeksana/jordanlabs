import "server-only"

import { createNavigationTools } from "./navigation"
export function createPortfolioTools() {
    return{
        ...createNavigationTools(),
    }
}